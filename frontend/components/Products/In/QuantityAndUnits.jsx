import { View, Text, TextInput } from "react-native";
import UnitDropdown from "./ValueDropdown";
import { useState } from "react";
import { getUnitNameById } from "../../../utils/unitMapper";

export default function QuantityAndUnits({ values, handleChange, unitId, errors, touched }) {
  const [unitOptions, setUnitOptions] = useState([]);
  
  return (
    <View className="bg-white rounded-xl p-4 mb-6">
      <Text className="text-lg font-medium text-gray-800 mb-4">
        Cantidad                      Unidad
      </Text>

      <View className="flex-row space-x-4 items-center">
        <TextInput
          className="bg-gray-50 rounded-xl mr-2 px-4 py-4 text-gray-800"
          placeholder="Valor"
          placeholderTextColor="#9CA3AF"
          value={values.quantity}
          onChangeText={handleChange("quantity")}
          keyboardType="numeric"
          style={{ flex: 0.4 }}
        />
        <View style={{ flex: 0.6 }}>
          <Text className="text-gray-800">{unitId ? getUnitNameById(unitId) : "Seleccione un producto"}</Text>

        </View>
      </View>
      {errors.quantity && touched.quantity && (
        <Text className="text-red-500 text-sm mt-1">{errors.quantity}</Text>
      )}
      {errors.unit_id && (
        <Text className="text-red-500 text-sm mt-1">{errors.unit_id}</Text>
      )}
    </View>
  );
}