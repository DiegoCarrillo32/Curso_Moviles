import LocationDemo from "@/components/LocationDemo";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <CameraDemo /> */}
      <LocationDemo />
      {/* <AudioDemo /> */}
    </View>
  );
}
