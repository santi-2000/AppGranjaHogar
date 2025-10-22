import { View, Text, TextInput } from "react-native";

export default function StockSection({ minStock, maxStock, onChangeMin, onChangeMax }) {
    return (
        <View className="bg-white p-4 rounded-2xl  mt-4">
            <View className="flex flex-row justify-center w-full gap-2 items-center">
                <View className="w-1/2 rounded-xl justify-center">
                    <Text className="text-lg font-medium text-gray-800">Stock mínimo</Text>
                    <View className="mt-2">
                        <TextInput
                            placeholder="Ej. 5"
                            className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
                            keyboardType="numeric"
                            value={String(minStock)}
                            onChangeText={(v) => onChangeMin(Number(v))}
                        />
                    </View>
                </View>

                <View className="w-1/2 rounded-xl justify-center">
                    <Text className="text-lg font-medium text-gray-800">Stock máximo</Text>
                    <View className="mt-2">
                        <TextInput
                            placeholder="Ej. 35"
                            className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
                            keyboardType="numeric"
                            value={String(maxStock)}
                            onChangeText={(v) => onChangeMax(Number(v))}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
