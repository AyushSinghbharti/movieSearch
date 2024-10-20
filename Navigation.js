import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MovieList from "./screens/MovieList";
import ShortlistedMovies from "./screens/ShortlistedMovies";
import Feather from "@expo/vector-icons/Feather";

const Tab = createBottomTabNavigator();

const Navigation = () => (
  <NavigationContainer>
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
  </NavigationContainer>
);

export default Navigation;
