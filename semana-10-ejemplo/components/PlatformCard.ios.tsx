import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlatformCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>PlatformCard IOS</Text>
      <Text style={styles.description}>PlatformCard IOS</Text>
    </View>
  );
};

export default PlatformCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f8ff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#007AFF", // Azul iOS
    shadowColor: "#007AFF",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "700", color: "#007AFF", marginBottom: 6 },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
});
