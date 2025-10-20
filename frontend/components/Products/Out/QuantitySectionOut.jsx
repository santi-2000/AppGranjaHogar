import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useUnits } from "../../../hooks/useUnits";

export default function QuantitySectionOut({ quantity, setQuantity, unitId, setUnitId}) {

    const { data, loading, error } = useUnits();
    const unitsArray = Array.isArray(data) ? data : [];

    return (
        <View>
            <View className="p-4 space-y-6 bg-white rounded-2xl border border-main">

                <View className="">
                    <Text className="text-gray-700 mb-2">Cantidad</Text>
                    <View className="mb-4 h-12">
                        <TextInput
                            placeholder="Valor"
                            keyboardType="numeric"
                            className="w-full border border-main rounded-xl h-12 p-3 mr-4"
                            value={String(quantity)}
                            onChangeText={setQuantity}
                        />
                    </View>
                    <View className="w-full text-gray-700 rounded-xl border border-main h-12 justify-center ">
                        {loading ? (
                            <ActivityIndicator size="small" color="#999"/>
                        ) : error ? (
                            <Text className="text-red-700 mb-2" >{error}</Text>
                        ) : (
                        <Picker 
                        selectedValue={unitId} 
                        onValueChange={(itemValue) => setUnitId(itemValue)}
                        >
                            <Picker.Item label="Seleccione..." value={null} />
                            {unitsArray.map((unit) => (
                                <Picker.Item key={unit.id} label={unit.name} value={unit.id} />
                            ))}
                        </Picker>
                        )}
                    </View>
                </View>

            </View>
        </View>
    )
}