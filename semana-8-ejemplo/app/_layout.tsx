import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="fetch-example" />
      <Stack.Screen name="axios-example" />
      {/* <Stack.Screen name="index" /> */}
    </Stack>
  );
}
