import { expoDb } from "@/db/client";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function RootLayout() {
  const [init, setInit] = useState(false);
  useEffect(() => {
    try {
      expoDb.execSync(`CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          done INTEGER NOT NULL DEFAULT 0
      );`);
      setInit(true);
    } catch (error) {
      console.error("Error al iniciar", error);
    }
  }, []);

  if (!init) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  return <Stack />;
}
