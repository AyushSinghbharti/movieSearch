import React from "react";
import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeMovie } from "../store";
import ShortlistScreen from "../components/shortlistedScreen";

export default function ShortlistedMovies() {
  const dispatch = useDispatch();
  const shortlisted = useSelector((state) => state.shortlisted);

  if (shortlisted.length === 0) {
    return <Text style={{ margin: 20 }}>No shortlisted movies yet.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={shortlisted}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <ShortlistScreen item={item} onRemove={() => dispatch(removeMovie(item))} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30,
  }
})
