import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Dimensions, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming, withSpring, interpolate } from "react-native-reanimated";
import { FetchDetail } from "../api";
import LoadingScreen from "../components/loadingScreen";
import MovieInfo from "../components/movieInfo";

const { width } = Dimensions.get("window");
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Dot = ({ index, scrollX }) => {
  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, [(index - 1) * width, index * width, (index + 1) * width], [0.3, 1, 0.3], "clamp"),
    transform: [{ scale: interpolate(scrollX.value, [(index - 1) * width, index * width, (index + 1) * width], [0.8, 1.2, 0.8], "clamp") }],
  }));

  return <Animated.View style={[styles.dot, dotStyle]} />;
};

const BackButton = ({ onPress }) => (
  <TouchableOpacity style={styles.backButtonContainer} onPress={onPress}>
    <Ionicons name="arrow-back" size={20} color="white" style={styles.backButton} />
  </TouchableOpacity>
);

export default function DetailScreen({ route, navigation }) {
  const { imdbID } = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollX = useSharedValue(0);
  const imageAnimations = {
    opacity: useSharedValue(0),
    scale: useSharedValue(0.8),
    translateX: useSharedValue(-50),
  };

  useEffect(() => {
    FetchDetail(imdbID)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const imageStyle = useAnimatedStyle(() => ({
    opacity: imageAnimations.opacity.value,
    transform: [
      { scale: imageAnimations.scale.value },
      { translateX: imageAnimations.translateX.value },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(scrollX.value, [0, width], [width, 0], "clamp") },
      { scale: interpolate(scrollX.value, [0, width], [0.8, 1], "clamp") },
    ],
    opacity: interpolate(scrollX.value, [width * 0.7, width], [0, 1], "clamp"),
  }));

  const handleImageLoad = () => {
    imageAnimations.opacity.value = withTiming(1, { duration: 1000 });
    imageAnimations.scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    imageAnimations.translateX.value = withSpring(0, { damping: 15, stiffness: 100 });
  };

  if (error) return <Text style={styles.errorText}>Error loading movie details</Text>;
  if (loading) return <LoadingScreen num={2} />;

  const infoArray = [
    "Title", "Year", "Genre", "Rated", "imdbRating", "Released",
    "Director", "Writer", "Actors", "Awards", "Country", "Language", "Plot"
  ].map(label => ({ label, value: data[label] }));

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
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
            style={[styles.poster, imageStyle]}
            resizeMode="cover"
            onLoadEnd={handleImageLoad}
          />
        </View>

        <Animated.View style={[styles.card, contentStyle]}>
          <FlatList
            style={styles.detailContainer}
            data={infoArray}
            renderItem={({ item, index}) => (
              <MovieInfo label={item.label} value={item.value} isPlot={item.label === "Plot"} index={index} />
            )}
            keyExtractor={item => item.label}
            ListHeaderComponent={<Text style={styles.title}>{data.Title}</Text>}
          />
        </Animated.View>
      </AnimatedScrollView>

      <View style={styles.dotsContainer}>
        {[0, 1].map(index => (
          <Dot key={index} index={index} scrollX={scrollX} />
        ))}
      </View>
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
    width,
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
    backgroundColor: "#fff",
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