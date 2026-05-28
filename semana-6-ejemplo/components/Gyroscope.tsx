import { Gyroscope } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const GyroSensor = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  const [subscription, setSubscription] = useState<any>(null);

  const subscribe = () => {
    Gyroscope.setUpdateInterval(2500);
    setSubscription(
      Gyroscope.addListener((gsdata) => {
        setData(gsdata);
      }),
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>x: {data.x.toFixed(2)}</Text>
      <Text>y: {data.y.toFixed(2)}</Text>
      <Text>z: {data.z.toFixed(2)}</Text>
    </View>
  );
};

export default GyroSensor;
