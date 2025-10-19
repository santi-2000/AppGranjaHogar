import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function QuantitySectionOut({ quantity, setQuantity, unitId, setUnitId}) {
    return (
        <View>
            <View className="p-4 space-y-6 bg-white rounded-2xl border border-main">

                <View className="">
                    <Text className="text-gray-700 mb-2">Cantidad</Text>
                    <View className="mb-4 h-12">
                        <TextInput
                            placeholder="Valor"
                            keyboardType="numeric"
                            className="w-full border border-main rounded-xl h-12 p-3 mr-4"
                            value={String(quantity)}
                            onChangeText={setQuantity}
                        />
                    </View>
                    <View className="w-full text-gray-700 rounded-xl border border-main h-12 justify-center ">
                        <Picker 
                            style={{color: ""}} 
                            selectedValue={unitId}
                            onValueChange={(itemValue, itemIndex) => {
                                setUnitId(itemValue);
                            }} 
                        >
                            <Picker.Item label="Unidad" value={null} />
                            <Picker.Item label="Masa (Kg)" value={1} />
                            <Picker.Item label="volumen (L)" value={2} />
                            <Picker.Item label="Piezas (Pcs)" value={3} />
                        </Picker>
                    </View>
                </View>

            </View>
        </View>
    )
}