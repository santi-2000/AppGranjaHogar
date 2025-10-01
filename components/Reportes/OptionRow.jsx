import { Pressable, View, Text } from "react-native";

export default function OptionRow({ label, value, onChange }) {
  return (
    <Pressable
      onPress={() => onChange?.(!value)}
      className="flex-row items-center gap-x-3 px-1 py-2"
    >
      <View
        className="w-5 h-5 rounded-md items-center justify-center"
        style={{ backgroundColor: value ? "#0A67C9" : "white", borderWidth: 1, borderColor: value ? "#0A67C9" : "#cbd5e1" }}
      >
        {value ? <Text style={{ color: "white", fontWeight: "bold" }}>✓</Text> : null}
      </View>
      <Text className="text-[16px] text-neutral-800">{label}</Text>
    </Pressable>
  );
}
