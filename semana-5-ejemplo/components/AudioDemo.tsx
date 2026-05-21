import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
export const AudioDemo = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = async () => {
    setIsPlaying(true);
    const { sound: soundObject } = await Audio.Sound.createAsync(
      {
        uri: "https://www.soundjay.com/buttons_c2026/button-1.mp3",
      },
      {
        shouldPlay: true,
      },
    );
    setSound(soundObject);

    soundObject.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        setIsPlaying(false);
      }
    });
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button
        onPress={playSound}
        disabled={isPlaying}
        title={isPlaying ? "Reproduciendio" : "Reproducir"}
      />
    </View>
  );
};
