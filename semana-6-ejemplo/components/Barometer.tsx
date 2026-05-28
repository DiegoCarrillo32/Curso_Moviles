import { Barometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const BarometerSensor = () => {
  const [{ pressure, relativeAltitude }, setData] = useState<{
    pressure: number;
    relativeAltitude?: number;
  }>({
    pressure: 0,
    relativeAltitude: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    Barometer.isAvailableAsync().then(setIsAvailable);
  }, []);

  useEffect(() => {
    if (isAvailable) {
      subscribe();
    }
    return () => unsubscribe();
  }, [isAvailable]);

  const subscribe = () => {
    setSubscription(
      Barometer.addListener((barometerData) => {
        setData(barometerData);
      }),
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  if (!isAvailable) {
    return (
      <View>
        <Text>Barometer sensor</Text>
        <Text>Sensor not available</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Pressure: {pressure.toFixed(2)}</Text>
      <Text>Relative Altitude: {relativeAltitude?.toFixed(2)}</Text>
    </View>
  );
};

export default BarometerSensor;
