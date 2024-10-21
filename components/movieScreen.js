import React from "react";
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
import DetailScreen from "./DetailScreen";

const MovieScreen = ({ item, numColumns, navigation }) => {
  const dispatch = useDispatch();
  const shortlisted = useSelector((state) => state.shortlisted);
  const isShortlisted = shortlisted.some(
    (movie) => movie.imdbID === item.imdbID
  );

  const AddinList = ({}) => {
    if (!isShortlisted) {
      dispatch(addMovie(item));
    } else {
      alert("Movie is already shortlisted!");
    }
  };

  return (
      <Pressable
        onPress={() => {
          <DetailScreen imdbID={item.imdbID} />
        }}
        style={[
          styles.movieBox,
          { width: Dimensions.get("window").width / numColumns - 20 },
        ]}
      >
        <Image
          source={{ uri: item.Poster }}
          style={styles.moviePoster}
          resizeMode="cover"
        />
        <Text style={styles.movieTitle}>{item.Title}</Text>
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
