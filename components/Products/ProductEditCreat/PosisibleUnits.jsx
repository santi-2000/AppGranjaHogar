import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function UnirSection() {
    return (
        <View className="bg-white p-4 rounded-2xl border border-main mt-4">
            <Text className="text-gray-700 mb-2">Unidades</Text>
            <View className="bg-white rounded-xl border border-gray-300">
                <Picker>
                    <Picker.Item label="Piezas" value="pieza" />
                </Picker>
            </View>
            <View className="mt-4">
                <Text className="text-main">+ agregar unidad</Text>
            </View>
        </View>
    );
}