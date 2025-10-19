import LanguageContextProvider from "@/context/lang-context";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <LanguageContextProvider>
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 text-fuchsia-100 bg-dark">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="setting" />
          <Stack.Screen name="language" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
    </LanguageContextProvider>
  )
}
