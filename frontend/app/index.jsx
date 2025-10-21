import "./global.css"
import { Text, View, TextInput, Image, Platform, Pressable, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import useLogin from "../hooks/useLogin";
import InputText from "../components/Form/InputText";
import { Link } from "expo-router";
import { useEffect } from "react";

/**
 * @module screens/login
 * 
 * @description The Login screen allows users to input their username and password to authenticate.
 * It includes form validation and handles the login process through the `useLogin` hook.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 */

export default function App() {
  const { login, setLoginData, loginData, error, handleChange, verify } = useLogin();

  useEffect(() => {
    verify();
  }, [])
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center bg-[#F2F3F5]">
            <View className="h-1/3"></View>
            <View className="justify-left p-10 h-full w-full bg-white rounded-t-[50px]">
              <View className="w-full items-center mt-[20px]">
                <Image
                  className="w-[96%] h-40"
                  style={{ resizeMode: "cover" }}
                  source={require('../assets/logos/main-logo.png')}
                />
              </View>
              <View className="ml-6 mt-[40px] mb-[20px]">
                <Text className="text-4xl font-bold">Inicia sesión</Text>
                <Text className="font-bold text-gray-400 text-lg">Introduce tus credenciales</Text>
              </View>

              <View className="border border-[0.5px] border-gray-300 rounded-xl mt-5 p-4 w-[96%] self-center">
                <View className="my-2">
                  <Text className="my-2">Usuario</Text>
                  <InputText
                    className={styles.textInput}
                    placeholder="Usuario"
                    value={loginData.username || ''}
                    onChange={(v) => handleChange('username', v)}
                  />
                </View>
                <View className="my-2">
                  <Text className="my-2">Contraseña</Text>
                  <InputText
                    className={styles.textInput}
                    placeholder="***"
                    secureTextEntry={true}
                    value={loginData.password || ''}
                    onChange={(v) => handleChange('password', v)}
                  />
                </View>

                {/* <Link href="/home" style={styles.submitButton} className="my-2 w-full py-2 px-4 rounded-lg items-center">
            <Text className="text-white text-center">Iniciar sesión</Text>
          </Link> */}

                <Pressable onPress={login} style={styles.submitButton} className="my-2 w-full py-2 px-4 rounded-lg items-center">
                  <Text className="text-white text-center">Iniciar sesión</Text>
                </Pressable>

              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}

const styles = {
  textInput: "border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5",
  submitButton: {
    backgroundColor: "#00568F",
  }
}
