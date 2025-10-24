/**
 * @module components/Products/Out/ProductSearch
 *
 * @description
 * A lightweight searchable dropdown for selecting a product.
 * Automatically updates its associated unit and stock information.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number|null} props.selectedProduct - The currently selected product ID.
 * @param {Function} props.setSelectedProduct - Function to update the selected product ID.
 * @param {Function} props.setUnitId - Function to update the unit ID.
 * @param {Function} props.setUnitName - Function to update the readable unit name.
 * @param {Function} props.setProductStock - Function to update the product's available stock.
 *
 * @returns {JSX.Element} A React Native component for selecting a product.
 *
 * @example
 * <ProductSearch
 *   selectedProduct={selectedProduct}
 *   setSelectedProduct={setSelectedProduct}
 *   setUnitId={setUnitId}
 *   setUnitName={setUnitName}
 *   setProductStock={setProductStock}
 * />
 *
 * @author
 * Samuel Isaac Lopez Mar
 */

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useProductsAvailable } from "../../../hooks/useProductsAvailable";
import { getUnitNameById } from "../../../utils/unitMapper";

/**
 * Searchable dropdown component for selecting products.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number|null} props.selectedProduct - The currently selected product ID.
 * @param {Function} props.setSelectedProduct - Function to update the selected product ID.
 * @param {Function} props.setUnitId - Function to set the unit ID (numeric value).
 * @param {Function} props.setUnitName - Function to set the readable unit name (for display).
 * @param {Function} props.setProductStock - Function to set the available stock of the selected product.
 *
 * @returns {JSX.Element} A React Native component for selecting a product.
 */
export default function ProductSearch({ selectedProduct, setSelectedProduct, setUnitId, setUnitName, setProductStock }) {
  const { data, loading, error } = useProductsAvailable();
  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = data.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  /**
   * Handles the selection of a product from the dropdown.
   * Automatically updates its unit and stock values.
   *
   * @function handleSelect
   * @param {Object} item - The selected product object.
   * @param {number} item.id - Product ID.
   * @param {string} item.name - Product name.
   * @param {number} item.unit_id - Unit ID associated with the product.
   * @param {number} [item.actual_stock] - The current stock of the product.
   * @returns {void}
   */
  const handleSelect = (item) => {
    setSelectedProduct(item.id);
    setSearch(item.name);
    setUnitId(item.unit_id);
    setUnitName(getUnitNameById(item.unit_id));
    setShowOptions(false);
    setProductStock(item.actual_stock);
  };

  return (
    <View className="bg-white p-4 rounded-2xl">
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
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-800">{item.name}</Text>
                    {item.actual_stock !== undefined && (
                      <Text className="text-gray-500 text-sm">
                        Stock: {item.actual_stock}
                      </Text>
                    )}
                  </View>
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
