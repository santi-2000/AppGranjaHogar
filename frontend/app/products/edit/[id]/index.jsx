import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TitleBar from '../../../../components/TitleBar';
import ValueSection from "../../../../components/Products/ProductEditCreat/value";
import PerishableSection from "../../../../components/Products/ProductEditCreat/Perishable";
import Categorysection from "../../../../components/Products/ProductEditCreat/Category";
import StockSection from "../../../../components/Products/ProductEditCreat/Stock";
import UnirSection from "../../../../components/Products/ProductEditCreat/PosisibleUnits";
import ButtonRounded from "../../../../components/Form/ButtonRounded";
import useEditProduct from '../../../../hooks/useEditProduct';


/** 
 * @module EditProductScreen
 * @decription This component allows users to edit an existing product's details.
 * It fetches the product data based on the provided ID and populates
 * the form fields for editing. Users can modify the product's name,
 * perishability, category, unit, and stock levels. Upon submission,
 * the updated product information is sent to the server.
 * @returns 
 * JSX.Element - The Edit Product Screen component.
 * 
 * @author Santiago Estrada
 */
export default function EditProductScreen() {
  const { productData, handleChange, initialLoading, handleEdit, editProduct, loading, error } = useEditProduct();
  

  if (initialLoading) {
    return (
      <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
        <TitleBar title={"Editar producto"} />
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg">Cargando producto...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Editar producto"} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="px-5" contentContainerStyle={{ flexGrow: 1 }}>

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
                text={loading ? "Guardando..." : "Guardar cambios"}
                disabled={loading}
                action={handleEdit}
              />
            </View>

            {error && (
              <View className="mt-4">
                <Text className="text-red-600 text-center">{error}</Text>
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
