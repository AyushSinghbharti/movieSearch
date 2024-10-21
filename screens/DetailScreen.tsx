import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FetchDetail } from "../api";
import { Ionicons } from "@expo/vector-icons";

export default function DetailScreen({ route, navigation }) {
  const { imdbID } = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
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
            style={{
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "black",
              elevation: 5,
              padding: 5,
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Image
          source={{ uri: data.Poster }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{data.Title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Year:</Text>
            <Text style={styles.infoValue}>{data.Year}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Genre:</Text>
            <Text style={styles.infoValue}>{data.Genre}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Rating:</Text>
            <Text style={styles.infoValue}>{data.Rated}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>IMDb Rating:</Text>
            <Text style={styles.infoValue}>{data.imdbRating}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Released:</Text>
            <Text style={styles.infoValue}>{data.Released}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Director:</Text>
            <Text style={styles.infoValue}>{data.Director}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Writer:</Text>
            <Text style={styles.infoValue}>{data.Writer}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Actors:</Text>
            <Text style={styles.infoValue}>{data.Actors}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Awards:</Text>
            <Text style={styles.infoValue}>{data.Awards}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Country:</Text>
            <Text style={styles.infoValue}>{data.Country}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Language:</Text>
            <Text style={styles.infoValue}>{data.Language}</Text>
          </View>
          <View style={styles.plotContainer}>
            <Text style={styles.plotLabel}>Plot:</Text>
            <Text style={styles.plotValue}>{data.Plot}</Text>
          </View>
        </View>
      </ScrollView>
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
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    marginBottom: 10,
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
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    textAlign: "right",
  },
  plotContainer: {
    marginTop: 10,
  },
  plotLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  plotValue: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 40,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    color: "#ff4d4d",
  },
});
