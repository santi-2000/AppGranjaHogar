import { Text, View, Alert, Platform, Pressable, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import { useState } from 'react';
import TitleBar from '../../../components/TitleBar';
import InputsSectionPassword from '../../../components/Settings/ChangePassword/InputsSectionPassword';
import ButtonRounded from '../../../components/Form/ButtonRounded';
import useUpdatePassword from '../../../hooks/useUpdatePassword';

export default function ChangePasswordScreen() {
  const { updatePassword, loading, error, success, resetState } = useUpdatePassword();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (key, value) => {
    setPasswordData(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(passwordData);
      Alert.alert(
        'Éxito',
        'Contraseña actualizada correctamente',
        [{
          text: 'OK', onPress: () => {
            setPasswordData({
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            });
            resetState();
          }
        }]
      );
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1, justifyContent: "space-between" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>
              <TitleBar title={"Contraseña"} />
              <View className="p-4">
                <InputsSectionPassword
                  passwordData={passwordData}
                  onChange={handleChange}
                />
              </View>
              {error && (
                <View className="px-4 mb-4">
                  <Text className="text-red-600 text-center">{error}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View className="px-4 pb-6">
        <ButtonRounded
          text={loading ? "Actualizando..." : "Guardar"}
          disabled={loading}
          action={handleUpdatePassword}
        />
      </View>
    </SafeAreaView>
  );
}
