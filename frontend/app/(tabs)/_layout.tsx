import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, TouchableOpacity, useColorScheme } from "react-native";
import { useAuth } from "../../context/auth";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { signOut } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerRight: () => (
          <Pressable onPress={signOut}>
            <FontAwesome
              size={28}
              style={{ marginBottom: 0, marginEnd: 10 }}
              name="sign-out"
            />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" />,
        }}
      />
      <Tabs.Screen
        name="setup"
        options={{
          title: "Setup",
          tabBarIcon: () => <TabBarIcon name="code" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <TabBarIcon name="code" />,
        }}
      />
    </Tabs>
  );
}
