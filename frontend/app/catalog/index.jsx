import { Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import TitleBar from '../../components/TitleBar';
import NewProduct from '../../components/Catalog/NewProduct';
import SearchProduct from '../../components/Catalog/SearchProduct';
import ProductCatalog from '../../components/Catalog/ProductCatalog';
import useGetCatalog from '../../hooks/useGetCatalog.jsx';
import { useEffect } from 'react';

const DATA = [
  {
    id: 0,
    name: '🍎 Manzana',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Piezas',
  },
  {
    id: 1,
    name: '🍌 Plátano',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Piezas',
  },
  {
    id: 2,
    name: '🥕 Zanahoria',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Kilogramos',
  },
  {
    id: 3,
    name: '🥩 Carne de res',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Kilogramos',
  },
  {
    id: 4,
    name: '🥚 Huevo',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Docenas',
  },
  {
    id: 5,
    name: '🥛 Leche',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Litros',
  },
  {
    id: 6,
    name: '🍞 Pan',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Piezas',
  },
  {
    id: 7,
    name: '🧀 Queso',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Kilogramos',
  },
  {
    id: 8,
    name: '🥦 Brócoli',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Kilogramos',
  },
  {
    id: 9,
    name: '🍅 Tomate',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Kilogramos',
  },
  {
    id: 10,
    name: '🥔 Papa',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Kilogramos',
  },
  {
    id: 11,
    name: '🥬 Lechuga',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Piezas',
  },
  {
    id: 12,
    name: '🍊 Naranja',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Kilogramos',
  },
  {
    id: 13,
    name: '🍇 Uvas',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Kilogramos',
  },
  {
    id: 14,
    name: '🍍 Piña',
    type: 'Perecedero',
    category: 'Alimento',
    unit: 'Piezas',
  },
  {
    id: 15,
    name: '🍫 Chocolate',
    type: 'No perecedero',
    category: 'Alimento',
    unit: 'Piezas',
  },
  {
    id: 16,
    name: '🥤 Refresco',
    type: 'No perecedero',
    category: 'Bebida',
    unit: 'Litros',
  },
  {
    id: 17,
    name: '🍪 Galletas',
    type: 'No perecedero',
    category: 'Alimento',
    unit: 'Paquetes',
  },
  {
    id: 18,
    name: '🥫 Atún en lata',
    type: 'No perecedero',
    category: 'Alimento',
    unit: 'Latas',
  },
  {
    id: 19,
    name: '🍚 Arroz',
    type: 'No perecedero',
    category: 'Alimento',
    unit: 'Kilogramos',
  },
  {
    id: 20,
    name: '🍝 Pasta',
    type: 'No perecedero',
    category: 'Alimento',
    unit: 'Paquetes',
  },
  {
    id: 21,
    name: '🧂 Sal',
    type: 'No perecedero',
    category: 'Condimento',
    unit: 'Kilogramos',
  },
  {
    id: 22,
    name: '🛢️ Aceite vegetal',
    type: 'No perecedero',
    category: 'Alimento',
    unit: 'Litros',
  },
  {
    id: 23,
    name: '☕ Café',
    type: 'No perecedero',
    category: 'Bebida',
    unit: 'Gramos',
  },
  {
    id: 24,
    name: '🍵 Té',
    type: 'No perecedero',
    category: 'Bebida',
    unit: 'Cajas',
  },
];

export default function CatalogScreen() {
  const { fetchCatalog, catalog, error } = useGetCatalog();

  useEffect(() => {
    fetchCatalog();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#F2F3F5', flex: 1 }}>
      <TitleBar title={'Catálogo'} />
      <View className="p-4">
        <View className="mb-4">
          <SearchProduct />
        </View>

        <View className="mb-4">
          <NewProduct />
        </View>

        <FlatList
          data={catalog}
          renderItem={({ item }) => <ProductCatalog data={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 280, // 👈 espacio extra para que el scroll no corte el último elemento
            paddingTop: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = {
  textInput: 'ml-3 text-gray-900 w-3/4 text-sm',
  submitButton: {
    backgroundColor: '#00568F',
  },
};
