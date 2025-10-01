import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Categorysection() {
    return (
        <View className="bg-white p-4 rounded-2xl border border-main mt-4">
            <Text className="text-gray-700 mb-2">Categoría a la que pertenece</Text>
            <View className="bg-white rounded-xl border border-gray-300">
                <Picker>
                    <Picker.Item label="Alimento" value="alimento" />
                </Picker>
            </View>
        </View>
    );
}