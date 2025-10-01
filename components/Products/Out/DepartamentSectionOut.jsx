import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function DepartamentSectionOut() {
    return (
        <View>
            <View className="bg-white p-4 rounded-2xl border border-main">
                <Text className="text-gray-700 mb-2">Departamento al que se dirige</Text>
                <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center">
                    <Picker selectedValue="">
                        <Picker.Item label="Seleccione..." value="" />
                        <Picker.Item label="Cocina" value="cocina" />
                        <Picker.Item label="Dormitorio" value="dormitorio" />
                        <Picker.Item label="Enfermería" value="enfermeria" />
                    </Picker>
                </View>
            </View>
        </View>
    )
}