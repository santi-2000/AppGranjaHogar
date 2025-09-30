import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleBar from '../../../../components/TitleBar';
import ValueSection from "../../../../components/Products/ProductEditCreat/value";


export default function EditProductScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Editar producto"} />
      <View className="p-4 center">
        <Text className="text-xl font-semibold">Nombre del producto</Text>
      </View>
      <View>
        <ValueSection />
      </View>
    </SafeAreaView>


  );
}
