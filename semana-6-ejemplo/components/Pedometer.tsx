import { Pedometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
const PedometerSensor = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [steps, setSteps] = useState(0);
  const [subs, setSubs] = useState<any>();

  useEffect(() => {
    Pedometer.isAvailableAsync().then(setIsAvailable);
  }, []);

  useEffect(() => {
    if (isAvailable) {
      subscribe();
    }

    return () => unsubscribe();
  }, []);

  const subscribe = async () => {
    const { granted } = await Pedometer.requestPermissionsAsync();
    if (!granted) {
      return;
    }

    const sub = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });
    setSubs(sub);
  };

  const unsubscribe = () => {
    subs && subs.remove();
    setSubs(null);
  };

  if (!isAvailable) {
    <View>
      <Text>Test</Text>
    </View>;
  }

  return (
    <View>
      <Text>Pedometer: {steps}</Text>
    </View>
  );
};

export default PedometerSensor;
