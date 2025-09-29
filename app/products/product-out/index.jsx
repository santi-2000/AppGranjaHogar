import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";

export default function OutScreen() {
  return (
    <SafeAreaView style={{ flexDirection: 'row' }}>
      <View className="bg-blue-400 w-90 p-4">
        <Text className="text-3xl will-change-variable">Salida</Text>
      </View>
    </SafeAreaView>
  );
}
