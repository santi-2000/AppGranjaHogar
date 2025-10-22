import { View, Text, Pressable } from "react-native";
import ArrowRightBarIcon from "./Icons/ArrowRighBartIcon";
import Avatar from "./Profile/Avatar";
import { useRouter } from "expo-router";
import { useUserStore } from "../stores/useUserStore";

export default function TitleBar({ title }) {
    const router = useRouter()
    const user = useUserStore((state) => state.user);

    return (
        <View className="mt-7 p-7">
            <View className="flex-row justify-between items-center">
                <Pressable onPress={() => router.back()}>
                    <ArrowRightBarIcon />
                </Pressable>
                <Text className="text-4xl font-bold">{title}</Text>
                <View>
                    <Avatar title={`${user?.name} ${user?.lastName}`} />
                </View>
            </View>
        </View>
    )
}