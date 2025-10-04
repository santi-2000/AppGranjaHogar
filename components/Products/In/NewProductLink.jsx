import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import AddIcon from "../../../components/Icons/AddIcon";
import ArrowRight from "../../../components/Icons/ArrowRight";

export default function NewProductLink() {
  return (
    <Link href="/products/new" asChild>
      <Pressable className="bg-white rounded-xl px-4 py-4 flex-row items-center justify-between mb-6">
        <View className="flex-row items-center">
          <View className="bg-green-100 rounded-lg p-2 mr-3">
            <AddIcon size={20} color="#1D8445" />
          </View>
          <Text className="text-gray-800 font-medium">
            Crear nuevo producto
          </Text>
        </View>
        <ArrowRight />
      </Pressable>
    </Link>
  );
}