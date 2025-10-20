import { View, Text, Switch } from "react-native";

export default function PerishableSection({ value, onChange }) {
    return (
        <View className="bg-white p-4 rounded-2xl border border-main mt-4">
            <View className="flex-row justify-between items-center">
                <Text className="text-gray-700">¿Es perecedero?</Text>
                <Switch 
                    value={value} 
                    onValueChange={onChange} 
                />
            </View>
        </View>
    );
}
