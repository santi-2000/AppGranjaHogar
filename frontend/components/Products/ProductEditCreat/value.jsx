import { View, Text, TextInput } from "react-native";

export default function ValueSection({ value, onChange }) {
    return (
        <View>
            <View className="bg-white p-4 rounded-2xl border border-main">
                <Text className="text-gray-700 mb-2">Nombre del producto</Text>
                <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center px-3">
                    <TextInput
                        placeholder="Manzana"
                        className="text-gray-700"
                        value={value}
                        onChangeText={onChange}
                        editable={true}
                    />
                </View>
            </View>
        </View>
    );
}
