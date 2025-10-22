import { View, Text, Switch } from "react-native";

export default function PerishableSection({ value, onChange }) {
    return (
        <View className="bg-white p-4 rounded-2xl mt-4">
            <View className="flex-row justify-between items-center">
                <Text className="text-lg font-medium text-gray-800 mb-2">¿Es perecedero?</Text>
                <Switch 
                    value={value} 
                    onValueChange={onChange} 
                />
            </View>
        </View>
    );
}
