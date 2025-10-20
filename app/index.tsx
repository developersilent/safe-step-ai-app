import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { homeImages } from "@/constants/home-img";
import {
  default as RightArrowIcon,
  default as SettingIcon,
} from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunched) {
        router.replace("/eye-vision"); // Skip landing for regular users
      } else {
        await AsyncStorage.setItem("hasLaunched", "true");
      }
    };
    checkFirstLaunch();
  }, []);

  const handleSettingsPress = () => {
    router.push("/setting");
  };
  const handleNextPress = () => {
    router.push("/eye-vision");
  };

  return (
    <View className="w-full flex relative items-center bg-dark justify-center h-full">
      <TouchableOpacity
        className="absolute top-7 right-7 p-2"
        activeOpacity={0.6}
        onPress={handleSettingsPress}
      >
        <SettingIcon name="settings" size={30} color="#D8B4FE" />
      </TouchableOpacity>
      <View className="w-[80%] h-fit">
        <Image
          source={homeImages.landingImage.src}
          alt={homeImages.landingImage.alt}
          className="w-full h-60 object-contain mb-4"
        />
        <TouchableOpacity
          className="border w-full bg-indigo-600 flex-row gap-1 items-center justify-center p-3 rounded-full"
          activeOpacity={0.8}
          onPress={handleNextPress}
        >
          {/* <Text className="text-fuchsia-pink-200 font-semibold text-md">Next</Text> */}
          <RightArrowIcon name="chevron-right" size={30} color="#D8B4FE" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
