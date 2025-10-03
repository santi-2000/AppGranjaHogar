import { Text, View, TextInput, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import { useState } from 'react';
import TitleBar from '../../../components/TitleBar';
import AddIcon from '../../../components/Icons/AddIcon';
import ChevronDownIcon from '../../../components/Icons/ChevronDownIcon';
import ArrowRight from '../../../components/Icons/ArrowRight';
import ButtonRounded from '../../../components/Form/ButtonRounded';
import UnitDropdown from '../../../components/Products/In/ValueDropdown';

export default function InScreen() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [isDonation, setIsDonation] = useState(true);
  const [cost, setCost] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleRegister = () => {
    
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
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}  edges={['bottom', 'left', 'right']} >
      <TitleBar title={"Nueva Entrada"} />
      
      <View className= "flex-1 px-6">
        {/*seleccionar producto*/}
        <View className= "mb-6">
          <Text className= "text-2xl font-medium text-gray-800 mb-3">
            Seleccione un producto
          </Text>

        <View className="bg-white rounded-xl p-4 mb-6">
        <UnitDropdown
              selectedValue={selectedProduct}
              setSelectedValue={setSelectedProduct}
              options={["Manzana", "Pera", "Naranja", "Arroz", "Frijoles", "Papel Higiénico", "Jabón de manos"]}
        />
        </View>


          
          {/*ir a crear nuevo producto*/}
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

        {/* cantidad + unidad en la misma fila */}
      <View className="bg-white rounded-xl p-4 mb-6">
         <Text className="text-lg font-medium text-gray-800 mb-4">
          Cantidad                      Unidad
        </Text> 

       <View className="flex-row space-x-4 items-center">
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
            placeholder="Valor"
            placeholderTextColor="#9CA3AF"
           value={quantityValue}
           onChangeText={setQuantityValue}
           keyboardType="numeric"
             style={{ flex: 0.4 }}
            />
     <View style={{ flex: 0.6 }}>
      <UnitDropdown
        selectedValue={selectedUnit}
        setSelectedValue={setSelectedUnit}
        options={["gr", "kg", "ml", "litros", "cajas"]}
       />
       </View>
      </View>
     </View>

        {/* donación */}
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
          
          {/* costo */}
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

        {/* fecha caducidad */}
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

        {/* registrar */}
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
