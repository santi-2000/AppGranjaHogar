import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flexDirection: 'row' }}>
      <View className="bg-blue-400 w-90 p-4">
        <Text className="text-3xl will-change-variable">Ajustes</Text>

        <Link className="mb-5" href="/settings/profile">
          <Text>Mi perfil</Text>
        </Link>

        <Link className="mb-5" href="/settings/manage-users">
          <Text>Gestión de usuarios</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
