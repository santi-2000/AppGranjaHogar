import React, { useState } from 'react';
import { Text, View, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleBar from '../../../components/TitleBar';
import ValueSection from "../../../components/Products/ProductEditCreat/value";
import PerishableSection from "../../../components/Products/ProductEditCreat/Perishable";
import Categorysection from "../../../components/Products/ProductEditCreat/Category";
import StockSection from "../../../components/Products/ProductEditCreat/Stock";
import UnirSection from "../../../components/Products/ProductEditCreat/PosisibleUnits";
import ButtonRounded from "../../../components/Form/ButtonRounded";
import useCreateProduct from '../../../hooks/useCreateProduct';
import { useRouter } from 'expo-router';


/**
 * @module NewProductScreen
 * @decription This component allows users to create a new product by filling out a form.
 * It includes fields for the product's name, perishability, category, unit, and stock levels.
 * Upon submission, the new product information is sent to the server.
 * @returns 
 * JSX.Element - The New Product Screen component.
 * @author Santiago Estrada
 */

export default function NewProductScreen() {
  const { createProduct, loading, error } = useCreateProduct();

  const [productData, setProductData] = useState({
    name: '',
    perishable: false,
    category_id: null,
    unit_id: null,
    min_stock: 0,
    max_stock: 0,
  });

  const handleChange = (key, value) => {
    setProductData(prev => ({ ...prev, [key]: value }));
  };

  const handleCreate = async () => {
    try {
      const newProduct = await createProduct(productData);
      if (newProduct) {
        console.log("Producto creado:", newProduct);
      }
    } catch (err) {
      console.error("Error al crear el producto:", err);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Crear producto"} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="px-6" contentContainerStyle={{ flexGrow: 1 }}>

            <ValueSection value={productData.name} onChange={(v) => handleChange('name', v)} />
            <PerishableSection value={productData.perishable} onChange={(v) => handleChange('perishable', v)} />
            <Categorysection value={productData.category_id} onChange={(v) => handleChange('category_id', v)} />
            <UnirSection value={productData.unit_id} onChange={(v) => handleChange('unit_id', v)} />
            <StockSection
              minStock={productData.min_stock}
              maxStock={productData.max_stock}
              onChangeMin={(v) => handleChange('min_stock', v)}
              onChangeMax={(v) => handleChange('max_stock', v)}
            />

            <View className="mt-8">
              <ButtonRounded
                text={loading ? "Creando..." : "Crear"}
                disabled={loading}
                action={handleCreate}
              />
            </View>



            {error &&
              <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
            }
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
