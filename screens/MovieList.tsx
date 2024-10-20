import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { fetchMovies, SearchMovies } from "../api";
import { addMovie } from "../store";
import movieScreen from "../components/movieScreen";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function MovieList() {
  const dispatch = useDispatch();
  const [text, onChangeText] = useState("");
  const [numColumns, setNumColumns] = useState(3);
  const [screenKey, setScreenKey] = useState("initial");

  const { data: movies, error, isLoading } = useQuery("movies", fetchMovies);
  const [result, setResult] = useState(movies);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get("window").width;
      const columns = screenWidth > 500 ? 3 : 2;
      setNumColumns(columns);
      setScreenKey(`columns-${columns}`);
    };

    updateLayout();
  }, []);

  // Handle search query
  const seachQuery = async () => {
    setLoading(true);
    if (text.trim() === "") {
      setResult(movies);
    } else {
      const searchData = await SearchMovies(text);
      setResult(searchData);
    }
    setLoading(false);
  };

  useEffect(() => {
    setResult(movies);
  }, [movies]);

  if (loading || isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading movies</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.seachBar}>
        <TextInput
          style={styles.searchText}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search"
        />
        <AntDesign
          name="search1"
          size={24}
          color="black"
          onPress={seachQuery}
        />
      </View>
      {!result ? (
        <Text>No Movie Founded</Text>
      ) : (
        <FlatList
          key={screenKey}
          data={result}
          keyExtractor={(item) => item.imdbID}
          numColumns={numColumns}
          renderItem={({ item }) =>
            movieScreen(item, numColumns, () => dispatch(addMovie(item)))
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30,
  },
  seachBar: {
    margin: 10,
    marginBottom: 0,
    padding: 20,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  searchText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
});
