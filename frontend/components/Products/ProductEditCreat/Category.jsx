import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Categorysection({ value, onChange }) {
    return (
        <View className="bg-white p-4 rounded-2xl mt-4">
            <Text className="text-lg font-medium text-gray-800 mb-2">Categoría a la que pertenece</Text>
            <View className="bg-gray-50 rounded-xl px-2 text-gray-800">
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
