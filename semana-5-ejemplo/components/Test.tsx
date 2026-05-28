import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Test() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Definimos la función asíncrona dentro del useEffect
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    // 2. La ejecutamos
    requestCameraPermission();
  }, []); // Array vacío para que solo se ejecute al montar el componente

  // Manejo de estados de la interfaz
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permisos...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No se otorgaron accesos a la cámara.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>¡Permiso concedido! Aquí iría tu componente de Cámara.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
