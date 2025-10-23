import { View, Text, TextInput, Switch } from "react-native";

export default function Donation({ handleChange, values, setFieldValue, errors, touched }) {
  return (
    <View className="bg-white rounded-xl p-4 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-medium text-gray-800">
          ¿Es una donación?
        </Text>
        <Switch
          value={values.is_donation}
          onValueChange={(value) => {
            setFieldValue("is_donation", value)
          }}
          trackColor={{ false: '#E5E7EB', true: '#00568F' }}
          thumbColor={'#FFFFFF'}
        />
      </View>
        {errors.is_donation && (
          <Text className="text-red-500 text-sm mt-1">{errors.is_donation}</Text>
        )}

      <View>
        <TextInput
          className={`rounded-xl px-4 py-4 ${values.is_donation ? 'bg-gray-200' : 'bg-gray-50'
            }`}
          placeholder="Costo"
          placeholderTextColor="#9CA3AF"
          value={values.cost}
          onChangeText={handleChange("cost")}
          editable={!values.is_donation}
        />
        {errors.cost && (
          <Text className="text-red-500 text-sm mt-1">{errors.cost}</Text>
        )}
      </View>
    </View>
  );
}