import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import TitleBar from '../../../components/TitleBar';
import InputsSectionPassword from '../../../components/Settings/ChangePassword/InputsSectionPassword';
import ButtonRounded from '../../../components/Form/ButtonRounded';

export default function ChangePasswordScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1, justifyContent: "space-between" }}>
      <View>
        <TitleBar title={"Contraseña"} />
        <View className="p-4">
          <InputsSectionPassword/> 
        </View>
      </View>
      <View className="px-4 pb-6">
        <ButtonRounded 
          text={"Guardar"}
        />
      </View>
    </SafeAreaView>
  );
}
