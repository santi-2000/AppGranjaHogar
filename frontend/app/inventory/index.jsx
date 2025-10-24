import { Text, View, FlatList, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleBar from '../../components/TitleBar';
import ProductSearch from '../../components/Products/Out/ProductSearch';
import { useInventory } from '../../hooks/useGetInventory';
import { findEmoji } from '../../utils/findEmojiUtil';
import { capitalizeFirstLetterEachWord } from '../../utils/textUtil';
import SearchProduct from '../../components/Catalog/SearchProduct';
import { getUnitNameById } from '../../utils/unitMapper';

export default function InventaryScreen() {
  const { setSearchTerm, searchTerm, filteredInventory, loading, error, refetch, formatQuantity } = useInventory();
  
  if (loading) {
    return (
      <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
        <TitleBar title={"Inventario"} />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#034977" />
          <Text className="text-gray-600 mt-4">Cargando inventario...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
        <TitleBar title={"Inventario"} />
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-600 text-center mb-4">Error al cargar el inventario</Text>
          <Text className="text-gray-600 text-center mb-4">{error}</Text>
          <Pressable
            className="bg-[#034977] rounded-full p-4"
            onPress={refetch}
          >
            <Text className="text-white text-center font-bold">Reintentar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Inventario"} />
      <View className="p-4" style={{ flex: 1 }}>

        <View className="mb-4">
          <SearchProduct 
            onSearch={setSearchTerm} 
            value={searchTerm} 
          />
        </View>
          {/* <ProductSearch 
            selectedProduct={selectedProduct}
            setSelectedProduct={handleProductSelect}
            setUnitId={() => {}} 
            setUnitName={() => {}} 
          />
        </View> */}

        <FlatList
          data={filteredInventory}
          renderItem={({ item }) => (
            <View className="bg-white rounded-2xl mb-3">
              <View className="flex-row justify-between p-4">
                <Text className={styles.text}>
                  {findEmoji(item.name)} {capitalizeFirstLetterEachWord(item.name)}
                </Text>
                <Text className={styles.text}>
                  {`${item.quantity} ${getUnitNameById(item.unit, true)}`}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-8">
              <Text className="text-gray-500 text-center">
                {searchTerm.trim() ? 'No se encontraron productos que coincidan con la búsqueda' : 'No hay productos en el inventario'}
              </Text>
            </View>
          }
        />

        <View className="mt-4">
          <Pressable
            className="bg-[#034977] rounded-full p-4 mb-2"
            onPress={refetch}
          >
            <Text className="text-white text-center text-xl font-bold">Refrescar Inventario</Text>
          </Pressable>
          {/* <Pressable className="bg-[#034977] rounded-full p-4">
            <Text className="text-white text-center text-xl font-bold">Imprimir</Text>
          </Pressable> */}
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = {
  textInput: "bg-white border border-gray-300 text-gray-900 text-sm rounded-full w-full p-3",
  text: "text-black text-base font-semibold",
}