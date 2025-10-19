import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function DepartamentSectionOut({ departmentId, setDepartmentId }) {
    return (
        <View>
            <View className="bg-white p-4 rounded-2xl border border-main">
                <Text className="text-gray-700 mb-2">Departamento al que se dirige</Text>
                <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center">
                    <Picker 
                    selectedValue={departmentId} 
                    onValueChange={(itemValue, itemIndex) => {
                        setDepartmentId(itemValue);
                    }}>
                        <Picker.Item label="Seleccione..." value={null} />
                        <Picker.Item label="Comedor" value={1} />
                        <Picker.Item label="Cocina" value={2} />
                        <Picker.Item label="Administración" value={3} />
                    </Picker>
                </View>
            </View>
        </View>
    )
}