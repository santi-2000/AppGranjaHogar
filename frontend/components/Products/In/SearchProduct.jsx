import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useProductsAvailableForEntries } from "../../../hooks/useProductsAvailableForEntries";

/**
 * Campo de búsqueda con dropdown (idéntico al usado en ProductSearch de Salidas)
 * Muestra sugerencias de productos activos mientras el usuario escribe.
 * @author Dania Sagarnaga Macías
 */
export default function SearchProduct({
  selectedProduct,
  setSelectedProduct,
}) {
  const { data } = useProductsAvailableForEntries();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredProducts = (data || []).filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (product) => {
    setSelectedProduct(product.id);
    setSearchTerm(product.name);
    setShowDropdown(false);
  };

  return (
    <View className="bg-white rounded-2xl p-4">
      <Text className="text-base font-semibold text-gray-800 mb-2">
        Producto
      </Text>

      <TextInput
        className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800"
        placeholder="Buscar producto..."
        placeholderTextColor="#9CA3AF"
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text);
          setShowDropdown(true);
        }}
      />

      {showDropdown && filteredProducts.length > 0 && (
        <View
          className="bg-white mt-2 rounded-xl border border-gray-200"
          style={{ maxHeight: 150 }}
        >
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => handleSelect(item)}>
                <View className="px-4 py-3 border-b border-gray-100">
                  <Text className="text-gray-800 font-medium">{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      )}
    </View>
  );
}