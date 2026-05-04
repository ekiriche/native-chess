import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="puzzle" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
