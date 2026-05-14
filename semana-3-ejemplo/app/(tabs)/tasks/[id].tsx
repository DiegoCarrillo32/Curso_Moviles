import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const DetailedView = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default DetailedView;
