import { Text, View, FlatList, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import TitleBar from '../../components/TitleBar';
import SearchProduct from '../../components/Catalog/SearchProduct';

const products = [
  { id: '0', emoji: '🍎', name: 'Manzana', quantity: '24 piezas' },
  { id: '1', emoji: '🥛', name: 'Leche', quantity: '30 litros' },
  { id: '2', emoji: '🍬', name: 'Dulces', quantity: '32 piezas' },
  { id: '3', emoji: '🧼', name: 'Jabón', quantity: '16 piezas' },
  { id: '4', emoji: '🦞', name: 'Langosta', quantity: '8 piezas' },
  { id: '5', emoji: '🧂', name: 'Sal', quantity: '4 kilogramos' },
  { id: '6', emoji: '🍊', name: 'Naranja', quantity: '15 piezas' },
  { id: '7', emoji: '🍌', name: 'Plátano', quantity: '40 piezas' },
  { id: '8', emoji: '🥕', name: 'Zanahoria', quantity: '20 piezas' },
  { id: '9', emoji: '🥬', name: 'Lechuga', quantity: '10 piezas' },
  { id: '10', emoji: '🍅', name: 'Tomate', quantity: '25 piezas' },
  { id: '11', emoji: '🥔', name: 'Papa', quantity: '18 piezas' },
];

export default function InventaryScreen() {

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Inventario"} />
      <View className="p-4" style={{ flex: 1 }}>

        {/* search bar */}
        <View className="mb-4">
          <SearchProduct />
        </View>

        {/* product listing */}
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View className="bg-white border border-gray-300 rounded-lg mb-3">
              <View className="flex-row justify-between p-4">
                <Text className={styles.text}>{item.emoji} {item.name}</Text>
                <Text className={styles.text}>{item.quantity}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        {/* print button */}
        <View className="mt-4">
          <Pressable className="bg-[#034977] rounded-full p-4">
            <Text className="text-white text-center text-xl font-bold">Imprimir</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = {
  textInput: "bg-white border border-gray-300 text-gray-900 text-sm rounded-full w-full p-3",
  text: "text-black text-base font-semibold",
}