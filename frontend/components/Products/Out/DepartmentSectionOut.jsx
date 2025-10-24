import { View, Text, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDepartments } from "../../../hooks/useDepartments";
import { departamentsArray } from "../../../utils/departamentsMapper";

export default function DepartmentSectionOut({ departmentId, setDepartmentId }) {

    // const { data, loading, error } = useDepartments();
    //const departmentsArray = Array.isArray(data) ? data : [];

    return (
        <View>
            <View className="bg-white p-4 rounded-2xl">
                <Text className="text-lg font-medium text-gray-800 mb-3">Departamento al que se dirige</Text>
                <View className="bg-gray-50 rounded-xl h-12 justify-center">
                    <Picker
                        selectedValue={departmentId}
                        onValueChange={(itemValue) => setDepartmentId(itemValue)}
                    >
                        <Picker.Item label="Seleccione..." value={null} />
                        {departamentsArray.map((dep) => (
                            <Picker.Item key={dep.id} label={dep.name} value={dep.id} />
                        ))}
                    </Picker>
                </View>
            </View>
        </View>
    )
}