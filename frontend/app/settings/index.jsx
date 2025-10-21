import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import TitleBar from '../../components/TitleBar';
import BoxIcon from '../../components/Icons/BoxIcon';
import LinkHome from '../../components/Home/LinkHome';
import UsersIcon from '../../components/Icons/UsersIcon';
import KeyIcon from '../../components/Icons/KeyIcon';
import LogoutIcon from '../../components/Icons/LogoutIcon';
import useSettings from '../../hooks/useSettings';

/**
 * @description This file defines the SettingsScreen component, which displays various settings options for the user.
 *              It includes links to manage users, change password, and log out.
 * @module screens/settings
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * 
 * @example
 * <SettingsScreen />
 */

export default function SettingsScreen() { 
  const { logout } = useSettings();

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Ajustes"} />

      <View className="p-4">

        <View className="mb-4">
          <LinkHome icon={<UsersIcon />} directory={"/settings/manage-users"} text={"Gestión de usuarios"} />
        </View>

        <View className="mb-4">
          <LinkHome icon={<KeyIcon />} directory={"/settings/change-password"} text={"Cambiar contraseña"} />
        </View>

        <View className="mb-4">
          <LinkHome icon={<LogoutIcon />} onPress={logout} text={"Cerrar sesión"} isButton={true} />
        </View>
      </View>
    </SafeAreaView>
  );
}
