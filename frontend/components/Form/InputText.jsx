import { View, Text, TextInput } from "react-native";

export default function InputText({ 
    value, 
    onChange, 
    placeholder, 
    error,
    touched,
    className = "bg-gray-50 rounded-xl px-4 py-4 text-gray-800", 
    secureTextEntry = false
}) {

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                className={className}
                value={value}
                onChangeText={onChange}
                editable={true}
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
            />
            {error && touched && 
            <Text className="text-sm mt-2 text-red-500">
                {error}
            </Text>}
        </View>
    );
}
