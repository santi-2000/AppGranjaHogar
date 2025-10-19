import { View, Text, TextInput } from "react-native";

export default function OutNotes({ notes, setNotes}) {
    return (
        <View>
            <View className="bg-white p-4 rounded-2xl border border-main">
                <Text className="text-gray-700 mb-2">Notas (opcional)</Text>
                <View className="bg-white rounded-xl border border-gray-300 h-12 justify-center">
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