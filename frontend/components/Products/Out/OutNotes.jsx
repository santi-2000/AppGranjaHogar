import { View, Text, TextInput } from "react-native";

export default function OutNotes({ notes, setNotes}) {
    return (
        <View>
            <View className="bg-white p-4 rounded-2xl">
                <Text className="text-lg font-medium text-gray-800 mb-3">Notas (opcional)</Text>
                <View className="bg-gray-50 rounded-xl h-12 justify-center">
                    <TextInput 
                    className="text-gray-700"
                    placeholder="Escribe aquí..."
                    value={notes}
                    onChangeText={setNotes}
                    />
                </View>
            </View>
        </View>
    )
}