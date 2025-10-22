import { Link } from "expo-router";
import { View, Text } from "react-native";
import { getColorFromName } from "../../utils/colorFromName";

export default function Avatar({ title, width = 56, height = 56, directory = "/settings" }) {
  return (
    <Link href={directory}>
      <View
        className={`justify-center items-center rounded-xl`}
        style={{ backgroundColor: getColorFromName(title.toUpperCase() || "Y"), width: width, height: height }}
      >
        <Text className="text-center text-3xl text-white">
          {title?.[0].toUpperCase() || 'Y'}
        </Text>
      </View>
    </Link>
  );
}