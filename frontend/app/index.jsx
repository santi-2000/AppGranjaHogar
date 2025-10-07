import "./global.css"
import { Text, View, TextInput, Image, Pressable } from "react-native";
import { Link } from "expo-router";


export default function App() {

  return (
    <View className="flex-1 justify-center bg-[#F2F3F5]">
      <View className="h-1/3"></View>
      <View className="justify-left p-10 h-full w-full bg-white rounded-t-[50px]">
        <View className="w-full items-center mt-[70px]">
          <Image
            className="w-3/4 h-32"
            style={{resizeMode: "cover"}}
            source={require('../assets/logos/main-logo.png')}
          />
        </View>
        <View className="ml-6 mt-[50px] mb-[30px]">
          <Text className="text-4xl font-bold">Inicia sesión</Text>
          <Text className="font-bold text-gray-400 text-lg">Introduce tus credenciales</Text>
        </View>

        <View className="border border-[0.5px] border-gray-300 rounded-xl mt-5 p-4">
          <View className="my-2">
            <Text className="my-2">Usuario</Text>
            <TextInput className={styles.textInput} placeholder="esquips" ></TextInput>
          </View>
          <View className="my-2">
            <Text className="my-2">Contraseña</Text>
            <TextInput className={styles.textInput} placeholder="***"></TextInput>
          </View>
          
          <Link href="/home" style={styles.submitButton} className="my-2 w-full py-2 px-4 rounded-lg items-center">
            <Text className="text-white text-center">Iniciar sesión</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = {
  textInput: "border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5",
  submitButton: {
    backgroundColor: "#00568F",
    
  }
}