import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { removeAccents } from "../../../utils/textUtil";
import { useProductsAvailableForEntries } from "../../../hooks/useProductsAvailableForEntries";

/**
 * Campo de búsqueda con dropdown (idéntico al usado en ProductSearch de Salidas)
 * Muestra sugerencias de productos activos mientras el usuario escribe.
 * @author Dania Sagarnaga Macías
 */
export default function SearchProduct({ setFieldValue, setIsPerishable, setUnitId, setFieldTouched, setFieldError, error, touched }) {
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const { data: options } = useProductsAvailableForEntries([]);

  const handleSearch = (text) => {
    setSearch(text);
    setIsPerishable(false);
    // Use null for product_id so it matches Yup.number() when empty
    setFieldValue("product_id", null);
    setFieldValue("unit_id", 0);
    setFieldValue("is_perishable", false);
    if (setFieldError) setFieldError("product_id", undefined);

    if (text.length > 0) {
      setFilteredOptions(options.filter((item) =>
        removeAccents(item?.name?.toLowerCase()).includes(removeAccents(text.toLowerCase()))
      ));
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleSelect = (item) => {
    const productId = Number(item.id); 
    setFieldValue("product_id", parseInt(item.id));
    setFieldValue("is_perishable", Boolean(item.perishable));
    setFieldValue("unit_id", parseInt(item.unit_id));
    if (setFieldTouched) setFieldTouched("product_id", true);
    if (setFieldError) setFieldError("product_id", undefined);
    setIsPerishable(Boolean(item.perishable));
    setSearch(item.name);
    setShowOptions(false);
    setUnitId(item.unit_id);
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-5">
      <Text className="text-base font-semibold text-gray-800 mb-2">
        Producto
      </Text>

      <TextInput
        className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800"
        placeholder="Buscar producto..."
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={(text) => {
          handleSearch(text);
          setShowOptions(true);
        }}
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
              <Text className="text-gray-800">{item.name}</Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 150, marginTop: 4, backgroundColor: "white" }}
          nestedScrollEnabled={true}
          scrollEnabled={false} 
        />
      )}

      {error && touched && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}