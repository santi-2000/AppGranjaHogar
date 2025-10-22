import { View, Text, TextInput } from "react-native";

export default function InputsSectionPassword({ passwordData, onChange }) {

    return (
        <View className="bg-white rounded-2xl p-4">
            <View className="my-2">
                <Text className="text-lg font-medium text-gray-800 mb-2">Contraseña actual</Text>
                <TextInput 
                    className={styles.textInput} 
                    placeholder="•••••••••••"
                    value={passwordData.currentPassword}
                    onChangeText={(value) => onChange('currentPassword', value)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>
            <View className="my-2">
                <Text className="text-lg font-medium text-gray-800 mb-2">Nueva contraseña</Text>
                <TextInput 
                    className={styles.textInput} 
                    placeholder="•••••••••••"
                    value={passwordData.newPassword}
                    onChangeText={(value) => onChange('newPassword', value)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>
            <View className="my-2">
                <Text className="text-lg font-medium text-gray-800 mb-2">Confirmar nueva contraseña</Text>
                <TextInput 
                    className={styles.textInput} 
                    placeholder="•••••••••••"
                    value={passwordData.confirmPassword}
                    onChangeText={(value) => onChange('confirmPassword', value)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>
        </View>
    )
}

const styles = {
    textInput: "bg-gray-50 rounded-xl px-4 py-4 text-gray-800",
    submitButton: {
        backgroundColor: "#00568F",
    }
}