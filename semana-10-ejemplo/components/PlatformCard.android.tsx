import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlatformCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>ANDROID</Text>
      <Text style={styles.description}>PlatformCard ANDROID</Text>
    </View>
  );
};

export default PlatformCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0fff4",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#34A853", // Verde Android
    elevation: 6, // Sombra nativa de Android (no shadowColor)
  },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "700", color: "#34A853", marginBottom: 6 },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
});
