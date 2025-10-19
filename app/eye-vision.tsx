import { default as LeftArrowIcon, default as Scan, default as More } from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function EyeVision() {
    const router = useRouter();
    const handleMorePress = () => {
        router.push("/setting");
    };
    return (
        <View className="w-full h-full bg-dark flex gap-3 p-5">
            {/* Header */}
            <View className="w-full h-14 flex-row items-center justify-between px-1">
                <Text className="text-fuchsia-200 text-xl font-bold text-center">AI Vision</Text>
                <TouchableOpacity onPress={handleMorePress} className="p-2 flex items-center justify-center" activeOpacity={0.6}>
                    <More name="more-vert" size={23} color="#D8B4FE" />
                </TouchableOpacity>
            </View>

            {/* Camera Capture */}
            <View className="w-full h-3/5 bg-neutral-800/50 border border-stone-400/10 rounded-2xl justify-center items-center">
                <Text className="text-fuchsia-200 text-lg">
                    Press Scan to use the camera
                </Text>
            </View>

            {/* Instructions */}
            <View className="w-full">
                <TouchableOpacity className="py-3 flex-row items-center justify-center gap-2 bg-indigo-600 rounded-xl" activeOpacity={0.6} >
                    <Scan name="document-scanner" size={30} color="#D8B4FE" />
                    <Text className="text-fuchsia-100 text-center font-semibold text-md">Scan</Text>
                </TouchableOpacity>
            </View>

            {/* Ai capture info */}
            <View className="w-full flex-1 bg-neutral-800/50 border border-stone-400/10 rounded-2xl justify-center items-center p-4">
                <Text className="text-fuchsia-200 text-center">AI is processing the captured image to analyze and provide feedback on your vision.</Text>
            </View>
        </View>
    )
}