/**
 * @module components/Products/Out/ProductSearch
 *
 * @description
 * A lightweight searchable dropdown for selecting a product.
 * Uses a regular map rendering instead of FlatList to avoid
 * VirtualizedList warnings inside nested scroll views.
 *
 * @component
 * @param {Object} props
 * @param {number|null} props.selectedProduct
 * @param {Function} props.setSelectedProduct
 * @returns {JSX.Element}
 *
 * @example
 * <ProductSearch
 *   selectedProduct={selectedProduct}
 *   setSelectedProduct={setSelectedProduct}
 * />
 *
 * @author
 * Samuel Isaac Lopez Mar
 */

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useProductsAvailable } from "../../../hooks/useProductsAvailable";

export default function ProductSearch({ selectedProduct, setSelectedProduct }) {
  const { data, loading, error } = useProductsAvailable();
  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = data.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    setSelectedProduct(item.id);
    setSearch(item.name);
    setShowOptions(false);
  };

  return (
    <View className="bg-white p-4 rounded-2xl">
      <Text className="text-lg font-medium text-gray-800 mb-3">Producto</Text>
      <View className="rounded-xl bg-gray-50">
        <TextInput
          placeholder="Buscar producto..."
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            setShowOptions(true);
          }}
          onFocus={() => setShowOptions(true)}
          className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
        />

        {loading && <ActivityIndicator size="small" color="#999" />}
        {error && <Text className="text-red-500">{error}</Text>}

        {showOptions && search.length > 0 && (
          <ScrollView
            className="border-t border-gray-300 max-h-40"
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="p-3 border-b border-gray-100"
                  onPress={() => handleSelect(item)}
                >
                  <Text className="text-gray-800">{item.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View className="p-3">
                <Text className="text-gray-500">No se encontraron productos</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
