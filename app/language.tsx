import { useLanguageContext } from '@/context/lang-context';
import { default as LeftArrowIcon } from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'zh', label: 'Chinese' },
];
export default function Language() {
    const { selectedLanguage, setSelectedLanguage } = useLanguageContext();
    const router = useRouter();
    const handleSelectLanguage = (code: string) => {
        // Logic to change app language
        setSelectedLanguage(code);
        router.back();
    }
    const handleBackPress = () => {
        router.back();
    }
    return (
        <View className="w-full h-full bg-dark px-5">
            {/* Header */}
      <View className="w-full h-16 flex-row items-center my-3">
        <TouchableOpacity onPress={handleBackPress} className="flex items-center justify-center" activeOpacity={0.6}>
          <LeftArrowIcon name="chevron-left" size={30} color="#D8B4FE" />
        </TouchableOpacity>
        <Text className="text-fuchsia-200 text-2xl font-bold text-center">
            Language
        </Text>
      </View>
            <View>
                {languages.map((lang) => (
                  <TouchableOpacity key={lang.code} onPress={() => handleSelectLanguage(lang.code)}
                   className={`flex-row px-5 items-center gap-3 rounded-xl mt-4 py-3 justify-between border-b border-neutral-500/20`} activeOpacity={0.6}>
                    <Text className={`text-fuchsia-200 text-md font-bold text-center ${selectedLanguage === lang.code ? 'text-bold text-indigo-500 text-xl' : ''}`}>{lang.label}</Text>
                     <Text className={`text-fuchsia-200 text-md font-bold text-center ${selectedLanguage === lang.code ? 'text-bold text-indigo-500 text-xl' : ''}`}>{lang.code}</Text>
                  </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}