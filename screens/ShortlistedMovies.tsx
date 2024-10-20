import React from "react";
import { View, Text, Button, FlatList, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeMovie } from "../store";

export default function ShortlistedMovies() {
  const dispatch = useDispatch();
  const shortlisted = useSelector((state) => state.shortlisted);

  if (shortlisted.length === 0) {
    return <Text style={{ margin: 20 }}>No shortlisted movies yet.</Text>;
  }

  return (
    <FlatList
      data={shortlisted}
      keyExtractor={(item) => item.imdbID}
      renderItem={({ item }) => (
        <View
          style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={{ uri: item.Poster }}
            style={{ width: 100, height: 150, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.Title}</Text>
            <Button
              title="Remove"
              onPress={() => dispatch(removeMovie(item))}
            />
          </View>
        </View>
      )}
    />
  );
}
