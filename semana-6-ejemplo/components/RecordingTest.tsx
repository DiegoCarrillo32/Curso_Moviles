import { Audio } from "expo-av";
import React, { useState } from "react";
import { Button, View } from "react-native";
const RecordingTest = () => {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [permission, request] = Audio.usePermissions();

  const [savedUri, setUri] = useState<string | null>();

  const startRecording = async () => {
    try {
      if (permission?.status !== "granted") {
        await request();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets["HIGH_QUALITY"],
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (error) {}
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording?.getURI();
    setUri(uri);
    console.log("stored at: ", uri);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: savedUri,
      },
      {
        shouldPlay: true,
      },
    );
    await sound.playAsync();
  };

  return (
    <View>
      <Button
        title={recording ? "Stop recording" : "Start recording"}
        onPress={recording ? stopRecording : startRecording}
      />

      {savedUri && <Button title="Play saved sound" onPress={playSound} />}
    </View>
  );
};

export default RecordingTest;
