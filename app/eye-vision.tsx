import {
  default as More,
  default as Scan,
} from "@expo/vector-icons/MaterialIcons";

import MonitorEye from "@expo/vector-icons/MaterialCommunityIcons";

import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";

export default function EyeVision() {
  const [cameraMode, setCameraMode] = useState(false);
  const router = useRouter();
  const handleMorePress = () => {
    router.push("/setting");
  };
  const device = useCameraDevice("back");
  const handleScanPress = () => {
    if (!device) return;
    setCameraMode((prev) => !prev);
  };
  return (
    <View className="w-full h-full bg-dark flex gap-3 p-5">
      {/* Header */}
      <View className="w-full h-14 flex-row items-center justify-between px-1">
        <Text className="text-fuchsia-200 text-xl font-bold text-center">
          AI Vision
        </Text>
        <TouchableOpacity
          onPress={handleMorePress}
          className="p-2 flex items-center justify-center"
          activeOpacity={0.6}
        >
          <More name="more-vert" size={23} color="#D8B4FE" />
        </TouchableOpacity>
      </View>

      {cameraMode && device ? (
        <View className="w-full h-3/5 bg-transparent border border-stone-400/10 rounded-2xl overflow-hidden">
          <Camera
            style={{
              width: "100%",
              height: "100%",
              transitionProperty: "all",
              transitionDuration: "500ms",
              transitionTimingFunction: "ease-in-out",
            }}
            device={device}
            isActive={cameraMode}
          />
        </View>
      ) : (
        <View className="w-full h-3/5 bg-neutral-800/50 border border-stone-400/10 rounded-2xl justify-center items-center">
          <Text className="text-fuchsia-200 text-lg">
            Press Scan to use the camera
          </Text>
        </View>
      )}
      {/* Camera Capture */}

      {/* Instructions */}
      <View className="w-full">
        <TouchableOpacity
          onPress={handleScanPress}
          className={`py-3 flex-row items-center justify-center gap-2 rounded-xl ${cameraMode ? "bg-red-500/70" : "bg-indigo-600"}`}
          activeOpacity={0.6}
        >
          {cameraMode ? (
            <MonitorEye name="monitor-eye" size={26} color="#D8B4FE" />
          ) : (
            <Scan name="document-scanner" size={26} color="#D8B4FE" />
          )}
          <Text className="text-fuchsia-100 text-center font-semibold text-md">
            {cameraMode ? "Stop Scan" : "Start Scan"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ai capture info */}
      <View className="w-full flex-1 bg-neutral-800/50 border border-stone-400/10 rounded-2xl justify-center items-center p-4">
        <Text className="text-fuchsia-200 text-center">
          AI is processing the captured image to analyze and provide feedback on
          your vision.
        </Text>
      </View>
    </View>
  );
}
