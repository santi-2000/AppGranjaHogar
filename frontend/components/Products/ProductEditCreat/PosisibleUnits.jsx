import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function UnirSection({ value, onChange }) {
    return (
        <View className="bg-white p-4 rounded-2xl mt-4">
            <Text className="text-lg font-medium text-gray-800 mb-2">Unidades</Text>
            <View className="bg-gray-50 rounded-xl px-4 text-gray-800">
                <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                >
                    <Picker.Item label="Seleccionar unidad" value={null} />
                    <Picker.Item label="Masa (kg)" value={1} />
                    <Picker.Item label="Volumen (L)" value={2} />
                    <Picker.Item label="Piezas (Pcs)" value={3} />
                </Picker>
            </View>
        </View>
    );
}
