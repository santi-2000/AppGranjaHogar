import { View, Text, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useReasons } from "../../../hooks/useReason";

export default function OutReason({ reasonId, setReasonId }) {

    const { data, loading, error } = useReasons();
    const reasonsArray = Array.isArray(data) ? data : [];

    return (
        <View>
            <View className="bg-white p-4 rounded-2xl">
                <Text className="text-lg font-medium text-gray-800 mb-3">Razón de salida</Text>
                <View className="bg-gray-50 rounded-xl h-12 justify-center">
                    {loading ? (
                        <ActivityIndicator size="small" color="#999" />
                    ) : error ? (
                        <Text className="text-red-700 mb-2" >{error}</Text>
                    ) : (
                        <Picker
                            selectedValue={reasonId}
                            onValueChange={(itemValue) => setReasonId(itemValue)}
                        >
                            <Picker.Item label="Seleccione..." value={null} />
                            {reasonsArray.map((reason) => (
                                <Picker.Item key={reason.id} label={reason.name} value={reason.id} />
                            ))}
                        </Picker>
                    )}
                </View>
            </View>
        </View>
    )
}