import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleBar from '../../../../components/TitleBar';
import ValueSection from "../../../../components/Products/ProductEditCreat/value";
import PerishableSection from "../../../../components/Products/ProductEditCreat/Perishable";
import Categorysection from "../../../../components/Products/ProductEditCreat/Category";
import StockSection from "../../../../components/Products/ProductEditCreat/Stock";
import UnirSection from "../../../../components/Products/ProductEditCreat/PosisibleUnits";
import ButtonRounded from "../../../../components/Form/ButtonRounded";


export default function EditProductScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Editar producto"} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="center">
          <Text className="text-xl font-semibold">Nombre del producto</Text>
        </View>
        <ValueSection />
        <PerishableSection />
        <Categorysection />
        <UnirSection />
        <StockSection />
        <View className="mt-8">
          <ButtonRounded text="Guardar cambios" action={() => { }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
