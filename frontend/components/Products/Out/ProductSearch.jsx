import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
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
    <View className="bg-white p-4 rounded-2xl border border-main">
      <Text className="text-gray-700 mb-2">Producto</Text>
      <View className="bg-white rounded-xl border border-gray-300">
        <TextInput
          placeholder="Buscar producto..."
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            setShowOptions(true);
          }}
          onFocus={() => setShowOptions(true)}
          className="p-3 text-gray-700"
        />

        {loading && <ActivityIndicator size="small" color="#999" />}
        {error && <Text className="text-red-500">{error}</Text>}

        {showOptions && search.length > 0 && (
          <View className="border-t border-gray-300 max-h-40">
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 border-b border-gray-100"
                  onPress={() => handleSelect(item)}
                >
                  <Text className="text-gray-800">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}
