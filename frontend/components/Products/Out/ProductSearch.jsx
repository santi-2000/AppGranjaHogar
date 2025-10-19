import { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";

export default function SearchProduct({ selectedProduct, setSelectedProduct }) {
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    {id: 1, name: "Manzanas Rojas"},
    {id: 2, name: "Yogurt Natural (Pack 6)"},
    {id: 3, name: "Lentejas (Bolsa 1kg)"},
  ];

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 0) {
      setFilteredOptions(options.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      ));
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleSelect = (item) => {
    setSelectedProduct(item.id);
    setSearch(item.name);
    setShowOptions(false);
  };

  return (
    <View className="bg-white p-4 rounded-2xl border border-main">
      <Text className="text-gray-700 mb-2">
        Seleccione un producto:
      </Text>
      <TextInput
        className="bg-white rounded-xl border border-gray-300 h-12 px-3 text-gray-700"
        placeholder="Buscar producto..."
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={handleSearch}
      />

    {showOptions && (
        <FlatList
            data={filteredOptions}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="text-gray-700 mb-2"
                    onPress={() => handleSelect(item)} 
                >
                    <Text className="text-gray-700 mb-2">{item.name}</Text>
                </TouchableOpacity>
            )}
            style={{ maxHeight: 150, marginTop: 4, backgroundColor: "white" }}
        />
    )}
    </View>
  );
}