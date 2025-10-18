import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function UnirSection({ value, onChange }) {
    return (
        <View className="bg-white p-4 rounded-2xl border border-main mt-4">
            <Text className="text-gray-700 mb-2">Unidades</Text>
            <View className="bg-white rounded-xl border border-gray-300">
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
