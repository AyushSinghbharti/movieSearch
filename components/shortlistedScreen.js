import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const ShortlistScreen = ({ item, onRemove }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.Poster }} style={styles.image} />
      <View>
        <View style={{flex: 1}}>
          <Text style={styles.heading}>{item.Title}</Text>
          <Text style={styles.subHeading}><Text style={{fontWeight: '800'}}>Release Year: </Text>{item.Year}</Text>
        </View>
        <Pressable style={styles.button} onPress={onRemove}>
          <Text style={styles.buttonText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "#f9c2ff",
    borderRadius: 10,
  },
  image: {
    height: 150,
    width: 100,
    borderRadius: 10,
  },
  heading: {
    fontWeight: "bold",
    width: "90%",
    padding: 5,
  },
  subHeading: {
    fontWeight: "400",
    padding: 5,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    margin: 10,
    marginBottom: 0,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ShortlistScreen;