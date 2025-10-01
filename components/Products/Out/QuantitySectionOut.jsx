import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function QuantitySectionOut() {
    return (
        <View>
            <View className="mb-4">
                <Text className="text-gray-700 mb-2">Seleccione un producto</Text>
                <View className="bg-white rounded-xl h-12 justify-center border border-main">
                    <Picker selectedValue="">
                        <Picker.Item label="Seleccione..." value="" />
                        <Picker.Item label="Arroz" value="arroz" />
                        <Picker.Item label="Frijoles" value="frijoles" />
                        <Picker.Item label="Leche" value="leche" />
                    </Picker>
                </View>
            </View>
            <View className="p-4 space-y-6 bg-white rounded-2xl border border-main">

                <View className="">
                    <Text className="text-gray-700 mb-2">Cantidad</Text>
                    <View className="mb-4 h-12">
                        <TextInput
                            placeholder="Valor"
                            keyboardType="numeric"
                            className="w-full border border-main rounded-xl h-12 p-3 mr-4"
                        />
                    </View>
                    <View className="w-full text-gray-700 rounded-xl border border-main h-12 justify-center ">
                        <Picker style={{color: ""}} selectedValue="">
                            <Picker.Item label="Unidad" value="" />
                            <Picker.Item label="Kg" value="kg" />
                            <Picker.Item label="L" value="l" />
                            <Picker.Item label="Pieza" value="pieza" />
                        </Picker>
                    </View>
                </View>

            </View>
        </View>
    )
}