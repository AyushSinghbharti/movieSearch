import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addMovie } from "../store";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const MovieScreen = ({ item, numColumns, index, navigation }) => {
  const dispatch = useDispatch();
  const shortlisted = useSelector((state) => state.shortlisted);
  const isShortlisted = shortlisted.some(
    (movie) => movie.imdbID === item.imdbID
  );

  const AddinList = () => {
    if (!isShortlisted) {
      dispatch(addMovie(item));
    } else {
      alert("Movie is already shortlisted!");
    }
  };

  // Animation Part
  const svImage = useSharedValue(0);
  const translateYImage = useSharedValue(100);
  const svText = useSharedValue(0);
  const translateYText = useSharedValue(50);

  useEffect(() => {
    const imageDuration = 300; 
    const imageDelay = index * 150;

    svImage.value = withTiming(1, {
      duration: imageDuration + imageDelay,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: true,
    });

    translateYImage.value = withTiming(0, {
      duration: imageDuration + imageDelay,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: true,
    });

    const textDuration = 500;
    const textDelay = index * 200;

    svText.value = withTiming(1, {
      duration: textDuration + textDelay,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: true,
    });

    translateYText.value = withTiming(0, {
      duration: textDuration + textDelay,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: true,
    });
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      opacity: svImage.value,
      transform: [{ translateY: translateYImage.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: svText.value,
      transform: [{ translateY: translateYText.value }],
    };
  });

  return (
    <Pressable
      style={[
        styles.movieBox,
        { width: Dimensions.get("window").width / numColumns - 20 },
      ]}
      onPress={() => {
        navigation.navigate("Details", { imdbID: item.imdbID });
      }}
    >
      <Animated.Image
        source={{ uri: item.Poster }}
        style={[styles.moviePoster, animatedImageStyle]}
        resizeMode="cover"
      />
      <Animated.Text style={[styles.movieTitle, animatedTextStyle]}>
        {item.Title}
      </Animated.Text>
      {isShortlisted ? (
        <Pressable
          onPress={AddinList}
          style={[styles.button, { backgroundColor: "grey" }]}
        >
          <Text style={styles.buttonText}>Already in List</Text>
        </Pressable>
      ) : (
        <Pressable onPress={AddinList} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  movieBox: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  moviePoster: {
    width: "90%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  movieTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f01d71",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
