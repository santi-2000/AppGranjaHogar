import { View, Text, TextInput } from "react-native";

export default function StockSection() {
    return (
        <View className="bg-white p-4 rounded-2xl border border-main mt-4">
            <View className="flex flex-row justify-center w-full gap-2 items-center">
                <View className="w-1/2 rounded-xl justify-center">
                    <Text className="text-gray-700 mb-2">Stock mínimo</Text>
                    <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center px-3">
                    <TextInput
                        placeholder="Ej. 5"
                        className="text-gray-700"
                        value={undefined}
                        editable={true}
                    />
                    </View>
                </View>
                <View className="w-1/2 rounded-xljustify-center">
                    <Text className="text-gray-700 mb-2">Stock máximo</Text>
                    <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center px-3">
                    <TextInput
                        placeholder="Ej. 35"
                        className="text-gray-700"
                        value={undefined}
                        editable={true}
                    />
                    </View>
                </View>
            </View>
        </View>
    );
}