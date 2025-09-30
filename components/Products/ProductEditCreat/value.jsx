import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ValueSection() {
    return (
        <View>
            <View className="bg-white p-4 rounded-2xl border border-main">
                <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center">
                    <Text className="text-gray-700">Manzana</Text>
                </View>
            </View>
        </View>
    );
}