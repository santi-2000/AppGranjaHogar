import { Text, View, TextInput, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import { useState } from 'react';
import TitleBar from '../../../components/TitleBar';
import AddIcon from '../../../components/Icons/AddIcon';
import ChevronDownIcon from '../../../components/Icons/ChevronDownIcon';
import ArrowRight from '../../../components/Icons/ArrowRight';
import ButtonRounded from '../../../components/Form/ButtonRounded';

export default function InScreen() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [isDonation, setIsDonation] = useState(true);
  const [cost, setCost] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Registering new entry:', {
      selectedProduct,
      quantityValue,
      selectedUnit,
      isDonation,
      cost,
      expirationDate
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Nueva Entrada"} />
      
      <View className="flex-1 px-6">
        {/* Product Selection Section */}
        <View className="mb-6">
          <Text className="text-lg font-medium text-gray-800 mb-3">
            Seleccione un producto
          </Text>
          
          {/* Product Dropdown */}
          <View className="bg-white rounded-xl px-4 py-4 mb-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">
                {selectedProduct || 'Value'}
              </Text>
              <ChevronDownIcon />
            </View>
          </View>
          
          {/* Create New Product Button */}
          <Link href="/products/new" asChild>
            <Pressable className="bg-white rounded-xl px-4 py-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="bg-green-100 rounded-lg p-2 mr-3">
                  <AddIcon size={20} color="#1D8445" />
                </View>
                <Text className="text-gray-800 font-medium">
                  Crear nuevo producto
                </Text>
              </View>
              <ArrowRight />
            </Pressable>
          </Link>
        </View>

        {/* Quantity Section */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <Text className="text-lg font-medium text-gray-800 mb-4">
            Cantidad
          </Text>
          
          {/* Value Input */}
          <View className="mb-3">
            <TextInput
              className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
              placeholder="Valor"
              placeholderTextColor="#9CA3AF"
              value={quantityValue}
              onChangeText={setQuantityValue}
            />
          </View>
          
          {/* Unit Dropdown */}
          <View className="bg-gray-50 rounded-xl px-4 py-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">
                {selectedUnit || 'Unidad'}
              </Text>
              <ChevronDownIcon />
            </View>
          </View>
        </View>

        {/* Donation Toggle and Cost Section */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-medium text-gray-800">
              ¿Es una donación?
            </Text>
            <Switch
              value={isDonation}
              onValueChange={setIsDonation}
              trackColor={{ false: '#E5E7EB', true: '#00568F' }}
              thumbColor={isDonation ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
          
          {/* Cost Input */}
          <TextInput
            className={`rounded-xl px-4 py-4 ${
              isDonation ? 'bg-gray-200' : 'bg-gray-50'
            }`}
            placeholder="Costo"
            placeholderTextColor="#9CA3AF"
            value={cost}
            onChangeText={setCost}
            editable={!isDonation}
          />
        </View>

        {/* Expiration Date Section */}
        <View className="bg-white rounded-xl p-4 mb-8">
          <Text className="text-lg font-medium text-gray-800 mb-4">
            Fecha de caducidad
          </Text>
          
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#9CA3AF"
            value={expirationDate}
            onChangeText={setExpirationDate}
          />
        </View>

        {/* Register Button */}
        <View className="mb-6">
          <ButtonRounded 
            action={handleRegister}
            text="Registrar"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
