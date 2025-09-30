import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserPlus from '../../../components/icons/UserPlus';
import TitleBar from '../../../components/TitleBar';
import LinkHome from '../../../components/home/LinkHome';
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
          <LinkUsers bg={"#25F86D"} width={50} height={50} directory={"/settings/manage-users/1"} text={"Ana Maria"} />
      </View>
    
      <View className="mb-2">
          <LinkUsers bg={"#25F86D"} width={50} height={50} directory={"/settings/manage-users/1"} text={"Ana Maria"} />
      </View>

    </View>
  
    </SafeAreaView>
  );
}
