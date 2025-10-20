import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Categorysection({ value, onChange }) {
    return (
        <View className="bg-white p-4 rounded-2xl border border-main mt-4">
            <Text className="text-gray-700 mb-2">Categoría a la que pertenece</Text>
            <View className="bg-white rounded-xl border border-gray-300">
                <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                >
                    <Picker.Item label="Seleccionar categoría" value={null} />
                    <Picker.Item label="Material de Oficina" value={1} />
                    <Picker.Item label="Alimentos y Aseo" value={2} />
                    <Picker.Item label="Papelería" value={3} />
                    <Picker.Item label="Material de Cómputo" value={4} />
                    <Picker.Item label="Material de Ferretería" value={5} />
                </Picker>
            </View>
        </View>
    );
}
