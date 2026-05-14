import { Drawer } from "expo-router/drawer";
import React from "react";
import { Slot, useRouter } from "expo-router";

const ProfileLayout = () => {
  const route = useRouter();
  return (
    // <View>
    //   <Pressable onPress={() => route.push("/profile/config")}>
    //     <Text>Config</Text>
    //   </Pressable>

    //   <Slot />
    // </View>
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Profile",
          title: "Your Profile",
        }}
      />

      <Drawer.Screen
        name="config"
        options={{
          drawerLabel: "Configuration",
          //   title: "Your Profile",
        }}
      />
    </Drawer>
  );
};

export default ProfileLayout;
