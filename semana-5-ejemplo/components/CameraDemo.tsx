import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CameraDemo = () => {
  const [facing, setFacing] = useState<"back" | "front">("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  if (!permission) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>Necesitamos el permiso para la cámara.</Text>
        <Button onPress={requestPermission} title="Otorgar permiso" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
          <Button title="Tomar otra foto" onPress={() => setPhotoUri(null)} />
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Capturar</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default CameraDemo;

const styles = StyleSheet.create({
  container: {
    height: 400,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    width: "100%",
    padding: 10,
  },

  camera: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
  },
  previewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
