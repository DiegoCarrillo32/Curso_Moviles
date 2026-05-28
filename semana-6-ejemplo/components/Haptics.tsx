import * as Haptics from "expo-haptics";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
export const HapticsDemo = () => {
  return (
    <View>
      <Text>Notification Feedback</Text>
      <View style={styles.buttonGroup}>
        <Button
          color={"#10B981"}
          title="Success"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          }
        />

        <Button
          color={"#EF4444"}
          title="Error"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
          }
        />

        <Button
          color={"#F59E0B"}
          title="Warning"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
          }
        />
      </View>

      <Text>Impact Feedback</Text>
      <View style={styles.buttonGroup}>
        <Button
          title="Light"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        />

        <Button
          title="Medium"
          onPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />

        <Button
          title="Heavy"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button
          title="Trigger Selection"
          onPress={() => Haptics.selectionAsync()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});
