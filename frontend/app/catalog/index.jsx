import { Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import TitleBar from '../../components/TitleBar';
import NewProduct from '../../components/Catalog/NewProduct';
import SearchProduct from '../../components/Catalog/SearchProduct';
import ProductCatalog from '../../components/Catalog/ProductCatalog';
import useGetCatalog from '../../hooks/useGetCatalog.jsx';
import { useEffect } from 'react';

/**
 * @module screens/catalog
 * 
 * @description
 * This screen is used to show a catalog of products. It uses the `useGetCatalog` hook to 
 * fetch the list of products and handles rendering the catalog, as well as providing 
 * functionality for product search and adding new products.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 */

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
            paddingBottom: 280,
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
