/**
 * @module components/Products/Out/QuantitySectionOut
 * @description
 * This component manages the quantity input and displays
 * the unit associated with the selected product.
 *
 * The unit is automatically assigned from the selected product
 * in the `ProductSearch` component. It does not fetch data from
 * the backend, keeping the interface lightweight and consistent.
 *
 * @example
 * // Example usage
 * <QuantitySectionOut
 *   quantity={quantity}
 *   setQuantity={setQuantity}
 *   unitId={unitId}
 *   unitName={unitName}
 * />
 *
 * @see {@link components/Products/Out/ProductSearch} - Provides the selected unit.
 *
 * @author
 * Samuel Isaac Lopez Mar
 */

import { View, Text, TextInput } from "react-native";

/**
 * Displays a numeric input for quantity and shows
 * the automatically selected unit name.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.quantity - The numeric quantity value.
 * @param {Function} props.setQuantity - Function to update the quantity.
 * @param {number|null} props.unitId - Numeric ID of the unit (used for backend).
 * @param {string} props.unitName - Readable name of the unit (for display).
 *
 * @returns {JSX.Element} A React Native component for managing quantity and unit display.
 */
export default function QuantitySectionOut({ quantity, setQuantity, unitId, unitName }) {
  return (
    <View>
      <View className="p-4 space-y-6 bg-white rounded-2xl border border-main">
        <Text className="text-gray-700 mb-2">Cantidad</Text>

        <TextInput
          placeholder="Valor"
          keyboardType="numeric"
          className="w-full border border-main rounded-xl h-12 p-3 mr-4 mb-2"
          value={String(quantity)}
          onChangeText={setQuantity}
        />
        {unitId ? (
          <Text className="text-gray-600 text-base">
            Unidad seleccionada automáticamente:{" "}
            <Text className="font-semibold text-gray-800">{unitName}</Text>
          </Text>
        ) : (
          <Text className="text-gray-400 italic">
            Selecciona un producto para asignar la unidad
          </Text>
        )}
      </View>
    </View>
  );
}