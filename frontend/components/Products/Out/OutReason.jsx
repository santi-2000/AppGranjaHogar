import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function OutReason({ reasonId, setReasonId }) {
    return (
        <View>
            <View className="bg-white p-4 rounded-2xl border border-main">
                <Text className="text-gray-700 mb-2">Razón de salida</Text>
                <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center">
                    <Picker 
                        selectedValue={reasonId}
                        onValueChange={(itemValue, itemIndex) => {
                            setReasonId(itemValue);
                        }}
                        >
                        <Picker.Item label="Seleccione..." value={null} />
                        <Picker.Item label="Venta" value={1} />
                        <Picker.Item label="Uso" value={2} />
                        <Picker.Item label="Donación" value={3} />
                        <Picker.Item label="Ajuste" value={4} />
                        <Picker.Item label="Otros" value={5} />
                    </Picker>
                </View>
            </View>
        </View>
    )
}