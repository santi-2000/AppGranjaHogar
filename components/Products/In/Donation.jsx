import { View, Text, TextInput, Switch } from "react-native";

export default function Donation({ isDonation, setIsDonation, cost, setCost }) {
  return (
    <View className="bg-white rounded-xl p-4 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-medium text-gray-800">
          ¿Es una donación?
        </Text>
        <Switch
          value={isDonation}
          onValueChange={setIsDonation}
          trackColor={{ false: '#E5E7EB', true: '#00568F' }}
          thumbColor={'#FFFFFF'}
        />
      </View>
      
      <TextInput
        className={`rounded-xl px-4 py-4 ${
          isDonation ? 'bg-gray-200' : 'bg-gray-50'
        }`}
        placeholder="Costo"
        placeholderTextColor="#9CA3AF"
        value={cost}
        onChangeText={setCost}
        editable={!isDonation}
      />
    </View>
  );
}