import { View, Text, Pressable } from "react-native";

export default function ButtonRounded({ action, text }) {
    return (
        <Pressable
            className="bg-[#00568F] rounded-full py-4"
            onPress={action}
        >
            <Text className="text-center text-white font-bold text-lg">
                {text}
            </Text>
        </Pressable>
    )
}

const styles = {
    submitButton: {
        backgroundColor: "#00568F",
    }
}