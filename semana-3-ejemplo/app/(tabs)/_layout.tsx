import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Welcome Diego",
        }}
      />
      <Tabs.Screen
        name="tasks/index"
        options={{
          title: "Tasks",
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="tasks/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
