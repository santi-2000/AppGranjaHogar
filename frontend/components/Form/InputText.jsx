import { View, Text, TextInput } from "react-native";

export default function InputText({ value, onChange, placeholder }) {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                className="text-gray-700"
                value={value}
                onChangeText={onChange}
                editable={true}
            />
        </View>
    );
}
