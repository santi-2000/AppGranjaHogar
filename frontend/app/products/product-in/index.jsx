import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

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
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }} edges={['bottom', 'left', 'right']} >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TitleBar title={"Nueva Entrada"} />

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
                  text="Registrar"
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}