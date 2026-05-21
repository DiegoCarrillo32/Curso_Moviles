import {
  LocationObject,
  PermissionStatus,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import React, { useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
const LocationDemo = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = async () => {
    setIsLoading(true);
    try {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== PermissionStatus.GRANTED) {
        setIsLoading(false);
        //TODO: Show error message
        return;
      }

      let currentLocation = await getCurrentPositionAsync();
      setLocation(currentLocation);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text>Modulo de GPS</Text>
      <Button
        title={isLoading ? "Buscando" : "Obtener"}
        onPress={getLocation}
        disabled={isLoading}
      />
      {isLoading && <ActivityIndicator size="large" />}
      {location && (
        <View>
          <Text>Coordenadas:</Text>
          <Text>Latitud: {location.coords.latitude.toFixed(6)}</Text>
          <Text>Longitud: {location.coords.longitude.toFixed(6)}</Text>
          <Text>Precisión: {location.coords.accuracy?.toFixed(6)}</Text>
        </View>
      )}
    </View>
  );
};

export default LocationDemo;
