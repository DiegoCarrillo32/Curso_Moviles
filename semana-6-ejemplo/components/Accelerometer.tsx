import { Accelerometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const AccelerometerSensor = () => {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);

  const subscribe = () => {
    const subscription = Accelerometer.addListener((measuredData) => {
      setData(measuredData);
    });
    setSubscription(subscription);
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
      <Text style={styles.text}>{x.toFixed(2)}</Text>
      <Text style={styles.text}>{y.toFixed(2)}</Text>
      <Text style={styles.text}>{z.toFixed(2)}</Text>
      <Button
        title={subscription ? "Pause" : "Resume"}
        onPress={subscription ? unsubscribe : subscribe}
      />
    </View>
  );
};

export default AccelerometerSensor;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});
