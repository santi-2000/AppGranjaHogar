import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import TitleBar from '../../../../components/TitleBar';

export default function EditProductScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Editar producto"} />
      <View className="p-6">
        <Text className="text-2xl">Editar producto</Text>
      </View>
    </SafeAreaView>
  );
}
