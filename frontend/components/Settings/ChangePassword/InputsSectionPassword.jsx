import { View, Text, TextInput } from "react-native";

export default function InputsSectionPassword({ passwordData, onChange }) {

    return (
        <View className="bg-white rounded-2xl p-4">
            <View className="my-2">
                <Text className="my-2">Contraseña actual</Text>
                <TextInput 
                    className={styles.textInput} 
                    placeholder="•••••••••••"
                    value={passwordData.currentPassword}
                    onChangeText={(value) => onChange('currentPassword', value)}
                    secureTextEntry={true}
                />
            </View>
            <View className="my-2">
                <Text className="my-2">Nueva contraseña</Text>
                <TextInput 
                    className={styles.textInput} 
                    placeholder="•••••••••••"
                    value={passwordData.newPassword}
                    onChangeText={(value) => onChange('newPassword', value)}
                    secureTextEntry={true}
                />
            </View>
            <View className="my-2">
                <Text className="my-2">Confirmar nueva contraseña</Text>
                <TextInput 
                    className={styles.textInput} 
                    placeholder="•••••••••••"
                    value={passwordData.confirmPassword}
                    onChangeText={(value) => onChange('confirmPassword', value)}
                    secureTextEntry={true}
                />
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