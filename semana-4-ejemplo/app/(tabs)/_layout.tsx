import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Coffee, Newspaper } from "lucide-react-native";
import { useTheme } from "@/src/contexts/ThemeContext";

const TabLayout = () => {
  const { colors, mode } = useTheme();

  const baseOptions = (tabBarLabel: string) => {
    return {
      headerShown: false,
      tabBarLabel,
      tabBarStyle: {
        backgroundColor: colors.background,
      },
      tabBarLabelStyle: {
        color: colors.text,
      },
    };
  };

  // VOLVEMOS 7:00
  return (
    <Tabs>
      <StatusBar style={mode === "light" ? "dark" : "light"} />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="brews/index"
        options={{
          ...baseOptions("Brews Feed"),
          tabBarIcon: ({ focused }) => (
            <Newspaper color={focused ? colors.primary : colors.text} />
          ),
        }}
      />
      <Tabs.Screen
        name="mybrews/index"
        options={{
          ...baseOptions("My Brews"),
          tabBarIcon: ({ focused }) => (
            <Coffee color={focused ? colors.primary : colors.text} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
