import { Pressable, Text, View } from "react-native";

export default function ReportActionButton({ title, onPress, variant = "primary", Icon }) {
  const bg = variant === "primary" ? "#2F7D4E" : "#0B537A";
  return (
    <Pressable
      onPress={onPress}
      className="w-full rounded-2xl items-center justify-center"
      style={{ backgroundColor: bg, height: 40, marginBottom: 12 }}
    >
      <View className="flex-row items-center gap-x-2">
        {Icon ? <Icon /> : null}
        <Text className="text-white text-[17px] font-semibold">{title}</Text>
      </View>
    </Pressable>
  );
}
