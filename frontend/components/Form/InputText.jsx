import { View, Text, TextInput } from "react-native";

export default function InputText({ value, onChange, placeholder, className }) {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                className={className}
                value={value}
                onChangeText={onChange}
                editable={true}
            />
        </View>
    );
}
