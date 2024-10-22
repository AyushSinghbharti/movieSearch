import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from "moti/skeleton";

const SkeletonCommonProps = {
  backgroundColor: "#f1f1f1",
  colorMode: "light",
  radius: "square",
  transition: {
    type: "timing",
    duration: 5000,
    loop: true,
  },
};

const LoadingScreen = () => {
  const skeletonArray = new Array(9).fill(0);

  return (
    <View style={styles.container}>
      {skeletonArray.map((_, index) => (
        <View key={index} style={styles.skeletonItem}>
          <Skeleton show height={260} width={"100%"} {...SkeletonCommonProps} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 35,
  },
  skeletonItem: {
    width: Dimensions.get("window").width / 2 - 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
});

export default LoadingScreen;