import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MovieList from "./screens/MovieList";
import ShortlistedMovies from "./screens/ShortlistedMovies";
import Feather from "@expo/vector-icons/Feather";
import DetailScreen from "./screens/DetailScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Movies"
      component={MovieList}
      options={{
        headerShown: false,
        tabBarIcon: () => <Feather name="home" size={24} color="black" />,
      }}
    />
    <Tab.Screen
      name="Shortlisted"
      component={ShortlistedMovies}
      options={{
        headerShown: false,
        tabBarIcon: () => <Feather name="archive" size={24} color="black" />,
      }}
    />
  </Tab.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
