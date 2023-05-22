import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
              title: "Sign In",
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              title: "Sign Up",
            }}
          />
        </Stack>
      </ThemeProvider>
    </>
  );
}
