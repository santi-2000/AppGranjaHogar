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
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(text) => {

            let cleaned = text.replace(/\D/g, "");
            if (cleaned.length > 4) {
              cleaned= cleaned.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
            } else if (cleaned.length > 2) {
              cleaned= cleaned.replace(/(\d{2})(\d{0,2})/, "$1/$2");
            }

            handleChange("exp_date")(cleaned);

          }}
        />
      </View>
    );
  } else {
    return null;
  }
}