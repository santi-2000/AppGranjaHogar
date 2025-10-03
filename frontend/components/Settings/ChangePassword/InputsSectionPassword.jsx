import { View, Text, TextInput } from "react-native";

export default function InputsSectionPassword() {

    return (
        <View className="bg-white rounded-2xl p-4">
            <View className="my-2">
                <Text className="my-2">Correo electrónico</Text>
                <TextInput className={styles.textInput} placeholder="ejemplo@granjahogar.com"></TextInput>
            </View>
            <View className="my-2">
                <Text className="my-2">Contraseña</Text>
                <TextInput className={styles.textInput} placeholder="•••••••••••"></TextInput>
            </View>
            <View className="my-2">
                <Text className="my-2">Nueva contraseña</Text>
                <TextInput className={styles.textInput} placeholder="•••••••••••"></TextInput>
            </View>
            <View className="my-2">
                <Text className="my-2">Confirmar nueva contraseña</Text>
                <TextInput className={styles.textInput} placeholder="•••••••••••"></TextInput>
            </View>
        </View>
    )
}

const styles = {
    textInput: "border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5",
    submitButton: {
        backgroundColor: "#00568F",
    }
}