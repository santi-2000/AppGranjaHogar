import { View, Text, TextInput } from "react-native";

export default function ExpirationDate({ values, handleChange }) {

  if (values.is_perishable) {
    return (
      <View className="bg-white rounded-xl p-4 mb-8">
        <Text className="text-lg font-medium text-gray-800 mb-4">
          Fecha de caducidad
        </Text>
        <TextInput
          className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#9CA3AF"
          value={values.exp_date}
          onChangeText={handleChange("exp_date")}
        />
      </View>
    );
  } else {
    return null;
  }
}