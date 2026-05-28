import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapsDemo = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const getPosition = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }
      const currentLoc = await Location.getCurrentPositionAsync({});
      setLocation(currentLoc);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  return loading ? (
    <View>
      <Text>Buscando coordenadas...</Text>
    </View>
  ) : (
    <View>
      <Text>{location?.coords.latitude.toFixed(6)}</Text>
      <Text>{location?.coords.longitude.toFixed(6)}</Text>

      <MapView
        loadingEnabled={loading}
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude ?? 37,
          longitude: location?.coords.longitude ?? -122,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          draggable
          title="Resaurante"
          description="Comida costarricense"
          coordinate={{
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapsDemo;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 300,
    marginVertical: 10,
  },
});
