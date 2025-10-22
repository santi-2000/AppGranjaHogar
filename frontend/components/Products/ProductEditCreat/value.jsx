import { View, Text, TextInput } from "react-native";

export default function ValueSection({ value, onChange }) {
    return (
        <View>
            <View className="bg-white p-4 rounded-2xl">
                <Text className="text-lg font-medium text-gray-800 mb-2">Nombre del producto</Text>
                <View className="mt-2">
                    <TextInput
                        placeholder="Manzana"
                        className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
                        value={value}
                        onChangeText={onChange}
                        editable={true}
                    />
                </View>
            </View>
        </View>
    );
}
