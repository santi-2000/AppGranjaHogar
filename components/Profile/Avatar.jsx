import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";


export default function Avatar({ title }) {
    return (
        <Link href={"/settings"}>
            <View className="w-16 h-16 bg-[#034977] justify-center items-center rounded-xl">
                <Text className="text-center text-3xl text-white">Y</Text>
            </View>
        </Link>
    )
}