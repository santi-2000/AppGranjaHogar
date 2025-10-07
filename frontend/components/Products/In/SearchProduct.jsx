import { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";

export default function SearchProduct({ selectedProduct, setSelectedProduct }) {
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    "Manzana",
    "Pera",
    "Plátano",
    "Naranja",
    "Arroz",
    "Frijoles",
    "Papel Higiénico",
    "Jabón de manos"
  ];

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 0) {
      setFilteredOptions(options.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      ));
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleSelect = (item) => {
    setSelectedProduct(item);
    setSearch(item);
    setShowOptions(false);
  };

  return (
    <View className="bg-white rounded-xl p-4 mb-6">
      <Text className="text-2xl font-medium text-gray-800 mb-3">
        Seleccione un producto:
      </Text>
      <TextInput
        className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
        placeholder="Buscar producto..."
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={handleSearch}
      />

      {showOptions && (
        <FlatList
          data={filteredOptions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="px-4 py-2 border-b border-gray-200"
              onPress={() => handleSelect(item)}
            >
              <Text className="text-gray-800">{item}</Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 150, marginTop: 4, backgroundColor: "white" }}
        />
      )}
    </View>
  );
}