import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserPlus from '../../../components/Icons/UserPlus';
import TitleBar from '../../../components/TitleBar';
import LinkHome from '../../../components/Home/LinkHome';
import LinkUsers from '../../../components/Users/LinkUsers';

export default function ManageUsersScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Usuarios"} />

    <View className="w-full flex-1 px-6">

      <View className="mb-4">
          <LinkHome icon={<UserPlus/>} directory={"/settings/manage-users/new-user"} text={"Registrar nuevo usuario"} />
      </View>

      <View className="mb-2">
          <LinkUsers width={50} height={50} directory={"/settings/manage-users/edit-user/0"} text={"Yahir Tapia"} email={"yahir.tapia@granjahogar.com"}/>
      </View>

      <View className="mb-2">
          <LinkUsers bg={"#0f8d3dff"} width={50} height={50} directory={"/settings/manage-users/edit-user/1"} text={"Ana Lopez"} email={"ana.lopez@granjahogar.com"}/>
      </View>
    
      <View className="mb-2">
          <LinkUsers bg={"#4F3A95"} width={50} height={50} directory={"/settings/manage-users/edit-user/2"} text={"Jared Marquez"} email={"jared.marquez@granjahogar.com"}/>
      </View>

    </View>
  
    </SafeAreaView>
  );
}
