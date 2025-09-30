import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Avatar({ title, bg = '#034977', width = 56, height = 56, directory = "/settings" }) {
  return (
    <Link href={directory}>
      <View
        className={`justify-center items-center rounded-xl`}
        style={{ backgroundColor: bg , width: width, height: height }}
      >
        <Text className="text-center text-3xl text-white">
          {title?.[0] || 'Y'}
        </Text>
      </View>
    </Link>
  );
}