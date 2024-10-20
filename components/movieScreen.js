import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

const movieScreen = (item, numColumns, dispatch) => {
  return (
    <View
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
      <Button title="Shortlist" onPress={() => dispatch(addMovie(item))} />
    </View>
  );
};

export default movieScreen;

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
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  movieTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});
