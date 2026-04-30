import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [Counter, setCounter] = useState(0);

  const handlePress = (increase, amount) => {
    setCounter(increase ? Counter + amount : Counter - amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contador: {Counter}</Text>
      <Pressable
        onPress={() => handlePress(false, 1)}
        onLongPress={() => handlePress(false, 5)}
        delayLongPress={5000}
        style={({ pressed }) => [
          styles.button,
          styles.buttonLeft,
          pressed ? { backgroundColor: "#9280e6" } : null,
        ]}
      >
        <Text style={styles.buttonText}>-1</Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress(true, 1)}
        onLongPress={() => handlePress(true, 5)}
        style={({ pressed }) => [
          styles.button,
          styles.buttonRight,
          pressed ? { backgroundColor: "#9280e6" } : null,
        ]}
      >
        <Text style={styles.buttonText}>+1</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#6461A0",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: Platform.OS === "ios" ? 60 : 80,
    height: Platform.OS === "ios" ? 60 : 80,
    padding: 10,
    margin: 50,
    bottom: 0,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombra para Android
    elevation: 5,
  },
  buttonLeft: {
    left: 0,
  },
  buttonRight: {
    right: 0,
  },
  text: {
    fontSize: 50,
    color: "#314CB6",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
