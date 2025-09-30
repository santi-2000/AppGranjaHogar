import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import ArrowRight from "../Icons/ArrowRight";
import AddIcon from "../Icons/AddIcon";


export default function NewProduct() {
    return (
        <Link className="justify-between items-center " href={"/settings"}>
            <View className="py-4 px-3 w-full flex-row justify-between bg-white rounded-2xl items-center">
                <View className="flex-row items-center">
                    <AddIcon/>
                    <Text className="ml-3">Crear nuevo producto</Text>
                </View>
                <View>
                    <ArrowRight />
                </View>
            </View>
        </Link>
    )
}