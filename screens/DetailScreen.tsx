import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { FetchDetail } from "../api";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "../components/loadingScreen";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  interpolate,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Dot = ({ index, scrollX }) => {
  const dotAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.3, 1, 0.3],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.8, 1.2, 0.8],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return <Animated.View style={[styles.dot, dotAnimatedStyle]} />;
};

export default function DetailScreen({ route, navigation }) {
  const { imdbID } = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollX = useSharedValue(0);
  const imageOpacity = useSharedValue(0);
  const imageScale = useSharedValue(0.8);
  const imageTranslateX = useSharedValue(-50);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemDetail = await FetchDetail(imdbID);
        setData(itemDetail);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, [0, width], [1, 0.8], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const translateX = interpolate(scrollX.value, [0, width], [0, -50], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return {
      opacity: imageOpacity.value,
      transform: [
        { scale: imageScale.value },
        { translateX: imageTranslateX.value },
      ],
    };
  });

  const handleImageLoad = () => {
    // Sequence of animations
    imageOpacity.value = withTiming(1, { duration: 1000 });
    imageScale.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });
    imageTranslateX.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });
  };

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value, [0, width], [width, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const scale = interpolate(scrollX.value, [0, width], [0.8, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const opacity = interpolate(scrollX.value, [width * 0.7, width], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return {
      transform: [{ translateX }, { scale }],
      opacity,
    };
  });

  const infoArray = [
    { label: "Title", value: data.Title },
    { label: "Year", value: data.Year },
    { label: "Genre", value: data.Genre },
    { label: "Rating", value: data.Rated },
    { label: "IMDb Rating", value: data.imdbRating },
    { label: "Released", value: data.Released },
    { label: "Director", value: data.Director },
    { label: "Writer", value: data.Writer },
    { label: "Actors", value: data.Actors },
    { label: "Awards", value: data.Awards },
    { label: "Country", value: data.Country },
    { label: "Language", value: data.Language },
    { label: "Plot", value: data.Plot },
  ];

  const renderInfo = ({ item }) => (
    <View
      style={[
        styles.infoContainer,
        item.label === "Plot" && styles.plotContainer,
      ]}
    >
      <Text style={styles.infoLabel}>{item.label}:</Text>
      <Text
        style={[styles.infoValue, item.label === "Plot" && styles.plotValue]}
      >
        {item.value}
      </Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {[0, 1].map((index) => (
        <Dot key={index} index={index} scrollX={scrollX} />
      ))}
    </View>
  );

  if (error)
    return <Text style={styles.errorText}>Error loading movie details</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={20}
            color="white"
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <LoadingScreen num={2} />
      ) : (
        <AnimatedScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <View style={styles.card}>
            <Animated.Image
              source={{ uri: data.Poster }}
              style={[styles.poster, imageAnimatedStyle]}
              resizeMode="cover"
              onLoadEnd={handleImageLoad}
            />
          </View>

          <Animated.View style={[styles.card, contentAnimatedStyle]}>
            <View style={styles.detailContainer}>
              <FlatList
                data={infoArray}
                renderItem={renderInfo}
                keyExtractor={(item) => item.label}
                ListHeaderComponent={
                  <Text style={styles.title}>{data.Title}</Text>
                }
              />
            </View>
          </Animated.View>
        </AnimatedScrollView>
      )}
      {renderDots()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30,
  },
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    zIndex: 10,
  },
  backButton: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "black",
    elevation: 5,
    padding: 5,
  },
  card: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  poster: {
    width: "95%",
    borderRadius: 10,
    elevation: 5,
    aspectRatio: 2 / 3,
  },
  detailContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: "95%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 5,
  },
  plotContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  infoLabel: {
    fontSize: 16,
    marginRight: 15,
    fontWeight: "600",
    color: "#555",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    textAlign: "right",
    marginRight: 10,
    flex: 1,
  },
  plotValue: {
    textAlign: "left",
    marginTop: 5,
    marginRight: 0,
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    color: "#ff4d4d",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginHorizontal: 4,
  },
});
