import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const PlatformCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Web / Otro</Text>
      <Text>Plataforma: {Platform.OS}</Text>
    </View>
  );
};

export default PlatformCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffbf0",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F4A61D",
  },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "700", color: "#F4A61D", marginBottom: 6 },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
});
