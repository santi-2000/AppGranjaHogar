//esto no está LISTO pausa 
import { View, Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useProductEntries } from '../../../hooks/useProductEntries';

import TitleBar from '../../../components/TitleBar';
import ButtonRounded from '../../../components/Form/ButtonRounded';

import SearchProduct from '../../../components/Products/In/SearchProduct';
import NewProductLink from '../../../components/Products/In/NewProductLink';
import QuantityAndUnits from '../../../components/Products/In/QuantityAndUnits';
import Donation from '../../../components/Products/In/Donation';
import ExpirationDate from '../../../components/Products/In/ExpirationDate';
import { useUserStore } from '../../../stores/useUserStore';

const validationSchema = Yup.object().shape({
  product_id: Yup.number().required('El producto es obligatorio'),
  unit_id: Yup.number().required('La unidad es obligatoria'),
  quantity: Yup.number().positive('La cantidad debe ser un número positivo').required('La cantidad es obligatoria'),
  is_donation: Yup.boolean().required('El tipo de entrada es obligatorio'),
  cost: Yup.number().notRequired(),
  exp_date: Yup.date().nullable().notRequired()
});

export default function InScreen() {
  const { isPerishable, setIsPerishable, unitId, setUnitId, createEntry, loading } = useProductEntries();

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
              <Formik
                initialValues={{ 
                  product_id: null, 
                  unit_id: null,
                  quantity: 0,
                  is_donation: true,
                  cost: 0,
                  exp_date: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => createEntry(values)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched }) => (
                  <View>
                    <SearchProduct
                      setFieldValue={setFieldValue}
                      setIsPerishable={setIsPerishable}
                      setUnitId={setUnitId}
                      error={errors.product_id}
                      touched={touched.product_id}
                    />

                    <NewProductLink />

                    <QuantityAndUnits
                      values={values}
                      handleChange={handleChange}
                      unitId={unitId}
                      errors={errors}
                      touched={touched}
                    />

                    <Donation
                      values={values}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />

                    {isPerishable && (
                    <ExpirationDate
                      values={values}
                      handleChange={handleChange}
                    />
                    )}

                    <View className="mb-6">
                      <ButtonRounded
                        action={handleSubmit}
                        text={loading ? "Registrando..." : "Registrar"}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}