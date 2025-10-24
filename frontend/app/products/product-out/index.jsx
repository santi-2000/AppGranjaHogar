/**
 * @module screens/products/OutScreen
 *
 * @description
 * Screen used to register product outflows. Allows users to select a product, define quantity,
 * specify department and reason, add optional notes, and submit the data to the backend.
 *
 * @component
 * @returns {JSX.Element} The product out registration screen.
 *
 * @example
 * import OutScreen from "./index";
 * <OutScreen />;
 *
 * @author
 * Samuel Isaac Lopez Mar
 */

import { View, Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router, useRouter } from "expo-router";
import TitleBar from "../../../components/TitleBar";
import QuantitySectionOut from "../../../components/Products/Out/QuantitySectionOut";
import DepartmentSectionOut from "../../../components/Products/Out/DepartmentSectionOut";
import ButtonRounded from "../../../components/Form/ButtonRounded";
import OutReason from "../../../components/Products/Out/OutReason";
import OutNotes from "../../../components/Products/Out/OutNotes";
import ProductSearch from "../../../components/Products/Out/ProductSearch";
import { useProductOuts } from "../../../hooks/useProductOuts";
import { useUserStore } from "../../../stores/useUserStore";

export default function OutScreen() {
  const { createProductOut, loading } = useProductOuts();
  const user = useUserStore((state) => state.user);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [unitId, setUnitId] = useState(null);
  const [unitName, setUnitName] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [reasonId, setReasonId] = useState(null);
  const [notes, setNotes] = useState("");
  const router = useRouter();
  const [productStock, setProductStock] = useState(null);

  /**
   * Handles the submission process for registering a new product outflow.
   *
   * This function validates multiple conditions before sending data to the backend:
   * - Ensures the current user session is active.
   * - Checks that all required fields (product, quantity, unit, department, reason) are filled.
   * - Validates that the entered quantity is not greater than the available product stock.
   * - Builds the request payload.
   * - Sends the data to the backend via `createProductOut`.
   *
   * If the request is successful, it displays a success alert and redirects the user to the product outflows screen.
   * If the quantity exceeds the available stock or another error occurs, it displays an appropriate error message.
   *
   * @async
   * @function handleRegister
   * @returns {Promise<void>} Alerts the user if validation fails or confirms success upon completion.
   *
   * @example
   * // Example frontend validation:
   * if (productStock !== null && quantity > productStock) {
   *   Alert.alert(
   *     "Stock insuficiente",
   *     `Solo hay ${productStock} unidades disponibles de este producto.`
   *   );
   *   return;
   * }
   */
  const handleRegister = async () => {
    try {
      if (!user) {
        Alert.alert("Error", "No se pudo obtener el usuario de la sesión actual.");
        return;
      }
      if (!selectedProduct || !quantity || !unitId || !departmentId || !reasonId) {
        Alert.alert("Campos incompletos", "Por favor llena todos los campos obligatorios.");
        return;
      }

      if (productStock !== null && quantity > productStock) {
        Alert.alert(
          "Stock insuficiente",
          `Solo hay ${productStock} unidades disponibles de este producto.`
        );
        return;
      }

      const payload = {
        user_id: user.id,
        product_id: selectedProduct,
        reason_id: reasonId,
        department_id: departmentId,
        unit_id: unitId,
        quantity: quantity,
        notes: notes || "",
      };

      console.log("Enviando payload:", payload);
      console.log("Unidad mostrada:", unitName);
      const result = await createProductOut(payload);
      console.log("Respuesta del servidor:", result);
      router.back();
    } catch (err) {
    if (err.message && err.message.includes("Stock insuficiente")) {
      Alert.alert("Stock insuficiente", err.message);
    } else {
      Alert.alert("Error", err.message || "No se pudo registrar la salida");
    }
  }
};

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#F2F3F5",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <TitleBar title={"Nueva Salida"} />
              <View className="px-6">
                <View className="mb-4">
                  <ProductSearch
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    setUnitId={setUnitId}
                    setUnitName={setUnitName}
                    setProductStock={setProductStock}
                  />
                </View>
                <View className="mb-4">
                  <QuantitySectionOut
                    quantity={quantity}
                    setQuantity={setQuantity}
                    unitId={unitId}
                    unitName={unitName}
                  />
                </View>
                <View className="mb-4">
                  <DepartmentSectionOut
                    departmentId={departmentId}
                    setDepartmentId={setDepartmentId}
                  />
                </View>
                <View className="mb-4">
                  <OutReason 
                  reasonId={reasonId}
                   setReasonId={setReasonId}
                    />
                </View>
                <View className="mb-4">
                  <OutNotes
                   notes={notes}
                    setNotes={setNotes}
                     />
                </View>
              </View>
            </View>
      <View className="px-4 pb-6">
        <ButtonRounded
          text={loading ? "Registrando..." : "Registrar"}
          action={handleRegister}
        />
      </View>
      </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
