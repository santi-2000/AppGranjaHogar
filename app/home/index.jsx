import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flexDirection: 'row' }}>
      <View className="bg-blue-400 w-full p-4">
        <Text className="text-3xl will-change-variable">Home</Text>

        <Link className="mb-5" href="/products/product-in">
          <Text>Entrada</Text>
        </Link>

        <Link className="mb-5" href="/products/product-out">
          <Text>Salida</Text>
        </Link>

        <Link className="mb-5" href="/inventary">
          <Text>Inventario</Text>
        </Link>

        <Link className="mb-5" href="/reports">
          <Text>Reportes</Text>
        </Link>

        <Link className="mb-5" href="/catalog">
          <Text>Catalogo</Text>
        </Link>

        <Link className="mb-5" href="/settings">
          <Text>settings</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
