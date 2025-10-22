//esto no está LISTO pausa 
import { View, Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'; // 👈 importamos SecureStore

import { useProductEntries } from '../../../hooks/useProductEntries';

import TitleBar from '../../../components/TitleBar';
import ButtonRounded from '../../../components/Form/ButtonRounded';

import SearchProduct from '../../../components/Products/In/SearchProduct';
import NewProductLink from '../../../components/Products/In/NewProductLink';
import QuantityAndUnits from '../../../components/Products/In/QuantityAndUnits';
import Donation from '../../../components/Products/In/Donation';
import ExpirationDate from '../../../components/Products/In/ExpirationDate';

export default function InScreen() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [isDonation, setIsDonation] = useState(true);
  const [cost, setCost] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [userId, setUserId] = useState(null);

  const { createEntry, loading } = useProductEntries();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedId = await SecureStore.getItemAsync('id');
        if (storedId) setUserId(Number(storedId));
      } catch (err) {
        console.error("Error al obtener user_id:", err);
      }
    };
    getUserId();
  }, []);

  const handleRegister = async () => {
    try {
      if (!selectedProduct || !quantityValue || !selectedUnit) {
        Alert.alert("Campos incompletos", "Por favor completa todos los campos requeridos.");
        return;
      }

      if (!userId) {
        Alert.alert("Error", "No se pudo obtener el usuario actual.");
        return;
      }

      const newEntry = {
        product_id: Number(selectedProduct),
        user_id: userId,
        unit_id: Number(selectedUnit),
        is_donation: isDonation,
        quantity: parseFloat(quantityValue),
        cost: isDonation ? null : parseFloat(cost) || 0,
        exp_date: expirationDate || null
      };

      const response = await createEntry(newEntry);

      console.log("Entrada registrada correctamente:", response.data.entry);
      console.log("Nuevo stock:", response.data.updated_stock);

      Alert.alert("Éxito", "Entrada registrada correctamente.");

      setSelectedProduct('');
      setQuantityValue('');
      setSelectedUnit('');
      setIsDonation(true);
      setCost('');
      setExpirationDate('');

    } catch (err) {
      console.error("Error al registrar:", err.message);
      Alert.alert("Error", err.message || "No se pudo registrar la entrada.");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }} edges={['bottom', 'left', 'right']}>
      <TitleBar title={"Nueva Entrada"} />

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
            <View className="flex-1 px-6">
              <SearchProduct selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
              <NewProductLink />

              <QuantityAndUnits
                quantityValue={quantityValue}
                setQuantityValue={setQuantityValue}
                selectedUnit={selectedUnit}
                setSelectedUnit={setSelectedUnit}
              />

              <Donation
                isDonation={isDonation}
                setIsDonation={setIsDonation}
                cost={cost}
                setCost={setCost}
              />

              <ExpirationDate
                expirationDate={expirationDate}
                setExpirationDate={setExpirationDate}
              />

              <View className="mb-6">
                <ButtonRounded
                  action={handleRegister}
                  text={loading ? "Registrando..." : "Registrar"}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}