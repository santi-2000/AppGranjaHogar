import { View, Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import TitleBar from "../../../components/TitleBar";
import QuantitySectionOut from "../../../components/Products/Out/QuantitySectionOut";
import DepartmentSectionOut from "../../../components/Products/Out/DepartmentSectionOut";
import ButtonRounded from "../../../components/Form/ButtonRounded";
import OutReason from "../../../components/Products/Out/OutReason";
import OutNotes from "../../../components/Products/Out/OutNotes";
import ProductSearch from "../../../components/Products/Out/ProductSearch";
import { useProductOuts } from "../../../hooks/useProductOuts";


export default function OutScreen() {
  const { createProductOut, loading } = useProductOuts();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [unitId, setUnitId] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [reasonId, setReasonId] = useState(null);
  const [notes, setNotes] = useState("");

  const handleRegister = async () => {
    try {
      if (!selectedProduct || !quantity || !unitId || !departmentId || !reasonId) {
        Alert.alert("Campos incompletos", "Por favor llena todos los campos obligatorios.");
        return;
      }

      const payload = {
        user_id: 3,
        product_id: selectedProduct,
        reason_id: reasonId,
        department_id: departmentId,
        unit_id: unitId,
        quantity: quantity,
        notes: notes || "",
      };

      console.log("Enviando payload:", payload);
      const result = await createProductOut(payload);

      console.log("Respuesta del servidor:", result);
      Alert.alert("Éxito", "Salida registrada correctamente 🎉");
      router.replace("/products/product-out");
    } catch (err) {
      console.error("Error al registrar salida:", err);
      Alert.alert("Error", err.message || "No se pudo registrar la salida");
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>
              <TitleBar title={"Nueva Salida"} />

              <View className="px-6">
                <View className="mb-4">
                  <ProductSearch
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                  />
                </View>
                <View className="mb-4">
                  <QuantitySectionOut
                    quantity={quantity}
                    setQuantity={setQuantity}
                    unitId={unitId}
                    setUnitId={setUnitId}
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
