import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleBar from '../../../components/TitleBar';
import ValueSection from "../../../components/Products/ProductEditCreat/value";
import PerishableSection from "../../../components/Products/ProductEditCreat/Perishable";
import Categorysection from "../../../components/Products/ProductEditCreat/Category";
import StockSection from "../../../components/Products/ProductEditCreat/Stock";
import UnirSection from "../../../components/Products/ProductEditCreat/PosisibleUnits";
import ButtonRounded from "../../../components/Form/ButtonRounded";
import useCreateProduct from '../../../hooks/useCreateProduct';

export default function NewProductScreen() {
  const { createProduct, loading, error } = useCreateProduct();

  const [productData, setProductData] = useState({
    name: '',
    perishable: false,
    category_id: null,
    unit_id: null,
    min_stock: 0,
    max_stock: 0,
    actual_stock: 0,
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
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="center">
          <Text className="text-xl font-semibold">Nombre del producto</Text>
        </View>

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

        <View className="mt-4">
          <Text className="text-lg font-semibold mb-2">Stock inicial</Text>
          <View className="bg-white border border-gray-300 rounded-lg p-3">
            <Text className="text-gray-600 mb-2">Cantidad inicial en inventario</Text>
            <TextInput
              className="text-lg font-semibold"
              value={productData.actual_stock.toString()}
              onChangeText={(v) => handleChange('actual_stock', parseInt(v) || 0)}
              keyboardType="numeric"
              placeholder="0"
            />
          </View>
        </View>

        <View className="mt-8">
          <ButtonRounded 
            text={loading ? "Creando..." : "Crear"} 
            disabled={loading}
            action={handleCreate} 
          />
        </View>

        {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}
