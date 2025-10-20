import Switcher1 from "@/components/switch";
import { useLanguageContext } from "@/context/lang-context";
import {
  default as Camera,
  default as Language,
  default as LeftArrowIcon,
  default as MicroPhone,
} from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";

export default function Setting() {
  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  // Use boolean state for switches
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);

  const { selectedLanguage } = useLanguageContext();
  const router = useRouter();
  const handleBackPress = () => {
    router.back();
  };

  // Sync state with actual permission status on mount or permission change
  useEffect(() => {
    setIsCameraEnabled(hasCameraPermission === true);
    setIsMicrophoneEnabled(hasMicrophonePermission === true);
  }, [hasCameraPermission, hasMicrophonePermission]);

  // Function to open app-specific permission settings
  const openAppPermissionSettings = async () => {
    if (Platform.OS === "ios") {
      await Linking.openURL("app-settings:");
    } else {
      await Linking.openSettings();
    }
  };

  // Handler for camera switch
  const handleCameraSwitch = async (value: boolean) => {
    if (value) {
      // If currently denied, guide user to settings
      if (hasCameraPermission === false) {
        Alert.alert(
          "Camera Permission Required",
          "Camera permission was denied. Please enable it in your app settings.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setIsCameraEnabled(false),
            },
            {
              text: "Open Settings",
              onPress: () => {
                openAppPermissionSettings();
                setIsCameraEnabled(false);
              },
            },
          ],
        );
        return;
      }

      const granted = await requestCameraPermission();
      setIsCameraEnabled(granted);
    } else {
      setIsCameraEnabled(false);
    }
  };

  // Handler for microphone switch
  const handleMicrophoneSwitch = async (value: boolean) => {
    if (value) {
      // If currently denied, guide user to settings
      if (hasMicrophonePermission === false) {
        Alert.alert(
          "Microphone Permission Required",
          "Microphone permission was denied. Please enable it in your app settings.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setIsMicrophoneEnabled(false),
            },
            {
              text: "Open Settings",
              onPress: () => {
                openAppPermissionSettings();
                setIsMicrophoneEnabled(false);
              },
            },
          ],
        );
        return;
      }

      const granted = await requestMicrophonePermission();
      setIsMicrophoneEnabled(granted);
    } else {
      setIsMicrophoneEnabled(false);
    }
  };

  const handleLanguagePress = () => {
    router.push("/language");
  };
  return (
    <View className="flex gap-4 w-full h-full bg-dark">
      {/* Header */}
      <View className="w-full h-16 flex-row items-center my-3">
        <TouchableOpacity
          onPress={handleBackPress}
          className="p-2 ml-5 flex items-center justify-center"
          activeOpacity={0.6}
        >
          <LeftArrowIcon name="chevron-left" size={30} color="#D8B4FE" />
        </TouchableOpacity>
        <Text className="text-fuchsia-200 text-2xl font-bold text-center">
          Settings
        </Text>
      </View>

      {/* Permissions */}
      <View className="p-7 bg-neutral-800/50 border border-stone-400/10 rounded-2xl w-[90%] mx-auto">
        <Text className="text-fuchsia-200/90 text-lg font-semibold mb-4">
          Permissions
        </Text>

        <View className="flex-row items-center gap-3 rounded-xl mt-1 justify-between">
          <View className="flex-row items-center gap-3">
            <Camera name="photo-camera" size={23} color="#D8B4FE" />
            <Text className="text-fuchsia-100 text-lg">Camera</Text>
          </View>
          <Switcher1
            value={isCameraEnabled}
            onValueChange={handleCameraSwitch}
          />
        </View>

        <View className="flex-row items-center gap-3 rounded-xl mt-7 justify-between">
          <View className="flex-row items-center gap-3">
            <MicroPhone name="mic" size={25} color="#D8B4FE" />
            <Text className="text-fuchsia-100 text-lg">Microphone</Text>
          </View>
          <Switcher1
            value={isMicrophoneEnabled}
            onValueChange={handleMicrophoneSwitch}
          />
        </View>
      </View>

      {/* Accessibility */}
      <View className="p-7 bg-neutral-800/50 border border-stone-400/10 rounded-2xl w-[90%] mx-auto">
        <Text className="text-fuchsia-200/90 text-lg font-semibold mb-4">
          Preference
        </Text>

        <TouchableOpacity
          onPress={handleLanguagePress}
          className="flex-row items-center gap-3 rounded-xl py-2 px-2"
          activeOpacity={0.6}
        >
          <Language name="language" size={23} color="#D8B4FE" />
          <Text className="text-fuchsia-200 text-md font-bold text-center">
            Language
          </Text>
          <Text className={`text-indigo-400 text-xl font-bold text-center`}>
            ({selectedLanguage})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
