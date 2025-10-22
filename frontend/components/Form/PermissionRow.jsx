import { Pressable, Text, View } from "react-native";

export default function PermissionRow({ label, value, onValueChange }) {
  return (
    <Pressable onPress={onValueChange} className="flex-row items-center" accessibilityRole="checkbox" accessibilityState={{ checked: value }}>
      <Checkbox checked={value} />
      <Text className={`text-base text-gray-900 ml-3 ${value ? 'font-semibold' : 'font-normal'}`}>{label}</Text>
    </Pressable>
  );
}

function Checkbox({ checked }) {
  return (
    <View
      className={checked ? "w-6 h-6 rounded-md items-center justify-center" : "w-6 h-6 rounded-md"}
      style={{ borderWidth: 2, borderColor: checked ? '#0F172A' : '#CBD5E1', backgroundColor: checked ? '#0F172A' : 'white' }}
    >
      {checked ? <Text className="text-white" style={{ lineHeight: 16 }}>✓</Text> : null}
    </View>
  );
}