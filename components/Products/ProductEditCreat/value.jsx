import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ValueSection() {
    return (
        <View>
            <View className="bg-white p-4 rounded-2xl border border-main">
                <Text className="text-gray-700 mb-2">Nombre del producto</Text>
                <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center px-3">
                    <TextInput
                        placeholder="Manzana"
                        className="text-gray-700"
                        value={undefined}
                        editable={true}
                    />
                </View>
            </View>
        </View>
    );
}