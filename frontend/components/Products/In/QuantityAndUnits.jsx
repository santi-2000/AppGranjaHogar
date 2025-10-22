import { View, Text, TextInput } from "react-native";
import UnitDropdown from "./ValueDropdown";

export default function QuantityAndUnits({ quantityValue, setQuantityValue, selectedUnit, setSelectedUnit }) {
  return (
    <View className="bg-white rounded-xl p-4 mb-6">
      <Text className="text-lg font-medium text-gray-800 mb-4">
        Cantidad                      Unidad
      </Text>

      <View className="flex-row space-x-4 items-center">
        <TextInput
          className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
          placeholder="Valor"
          placeholderTextColor="#9CA3AF"
          value={quantityValue}
          onChangeText={setQuantityValue}
          keyboardType="numeric"
          style={{ flex: 0.4 }}
        />
        <View style={{ flex: 0.6 }}>
          <UnitDropdown
            selectedValue={selectedUnit}
            setSelectedValue={setSelectedUnit}
            options={["gr", "kg", "ml", "litros", "cajas"]}
          />
        </View>
      </View>
    </View>
  );
}