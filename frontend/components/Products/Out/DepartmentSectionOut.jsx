import { View, Text, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDepartments } from "../../../hooks/useDepartments";

export default function DepartmentSectionOut({ departmentId, setDepartmentId }) {

    const { data, loading, error } = useDepartments();
    const departmentsArray = Array.isArray(data) ? data : [];

    return (
        <View>
            <View className="bg-white p-4 rounded-2xl border border-main">
                <Text className="text-gray-700 mb-2">Departamento al que se dirige</Text>
                <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center">
                    {loading ? (
                        <ActivityIndicator size="small" color="#999"/>
                    ) : error ? (
                        <Text className="text-red-500 text-sm" >{error}</Text>
                    ) : (
                    <Picker 
                    selectedValue={departmentId} 
                    onValueChange={(itemValue) => setDepartmentId(itemValue)}
                    >
                        <Picker.Item label="Seleccione..." value={null} />
                        {departmentsArray.map((dep) => (
                            <Picker.Item key={dep.id} label={dep.name} value={dep.id} />
                        ))}
                    </Picker>

                    )}
                </View>
            </View>
        </View>
    )
}