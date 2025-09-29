import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import TitleBar from '../../../components/TitleBar';

export default function ManageUsersScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Usuarios"} />
      <View className="bg-blue-400 w-90 p-4">
        <Text className="text-3xl will-change-variable">gestionar usuarios</Text>

        <Link className="mb-5" href="/settings/manage-users/new-user">
          <Text>Registrar nuevo usuario</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
