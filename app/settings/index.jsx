import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import TitleBar from '../../components/TitleBar';
import BoxIcon from '../../components/Icons/BoxIcon';
import LinkHome from '../../components/Home/LinkHome';
import UsersIcon from '../../components/Icons/UsersIcon';
import KeyIcon from '../../components/Icons/KeyIcon';
import LogoutIcon from '../../components/Icons/LogoutIcon';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Ajustes"} />

      <View className="p-4">

        <View className="mb-4">
          <LinkHome icon={<UsersIcon />} directory={"/settings/manage-users"} text={"Gestión de usuarios"} />
        </View>

        <View className="mb-4">
          <LinkHome icon={<KeyIcon />} directory={"/inventory"} text={"Cambiar contraseña"} />
        </View>

        <View className="mb-4">
          <LinkHome icon={<LogoutIcon />} directory={"/"} text={"Cerrar sesión"} />
        </View>
      </View>
    </SafeAreaView>
  );
}
