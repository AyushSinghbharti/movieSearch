import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming, withSpring, interpolate, Easing } from "react-native-reanimated";

const movieInfo = ({ label, value, isPlot, index }) => {

  // Animation Part
  const svText = useSharedValue(0);
  const translateXText = useSharedValue(50);

  useEffect(() => {
    const textDuration = 750;
    const textDelay = index * 100;

    svText.value = withTiming(1, {
      duration: textDuration + textDelay,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: true,
    });

    translateXText.value = withTiming(0, {
      duration: textDuration + textDelay,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: true,
    });
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: svText.value,
      transform: [{ translateX: translateXText.value }],
    };
  });

  return (
    <Animated.View style={[styles.infoContainer, isPlot && styles.plotContainer, animatedTextStyle]}>
      <Animated.Text style={[styles.infoLabel, animatedTextStyle]}>{label}:</Animated.Text>
      <Animated.Text style={[styles.infoValue, isPlot && styles.plotValue, animatedTextStyle]}>
        {value}
      </Animated.Text>
    </Animated.View>
  );
};

export default movieInfo;

const styles = StyleSheet.create({
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
});
