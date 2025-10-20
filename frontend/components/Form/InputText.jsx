import { View, Text, TextInput } from "react-native";

export default function InputText({ value, onChange, placeholder, secureTextEntry}) {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                className="border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-700 text-base"
                value={value}
                onChangeText={onChange}
                editable={true}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}
