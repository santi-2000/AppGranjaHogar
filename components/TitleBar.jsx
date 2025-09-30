import { View, Text, Pressable } from "react-native";
import ArrowRightBarIcon from "./Icons/ArrowRighBartIcon";
import Avatar from "./Profile/Avatar";
import { useRouter } from "expo-router";

export default function TitleBar({ title }) {
    const router = useRouter()
    return (
        <View className="p-7">
            <View className="flex-row justify-between items-center">
                <Pressable onPress={() => router.back()}>
                    <ArrowRightBarIcon />
                </Pressable>
                <Text className="text-4xl font-bold">{title}</Text>
                <View>
                    <Avatar />
                </View>
            </View>
        </View>
    )
}