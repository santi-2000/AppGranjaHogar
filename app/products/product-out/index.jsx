import { View, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import TitleBar from '../../../components/TitleBar';
import QuantitySectionOut from "../../../components/Products/Out/QuantitySectionOut";
import DepartamentSectionOut from "../../../components/Products/Out/DepartamentSectionOut";

export default function OutScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1, justifyContent: "space-between" }}>
      <View>
        <TitleBar title={"Nueva Entrada"} />

        <View className="p-4">
          <View className="mb-4">
            <QuantitySectionOut />
          </View>

          <View className="mb-4">
            <DepartamentSectionOut />
          </View>

        </View>
      </View>
      <View className="px-4 pb-6">
        <Pressable
          className="bg-[#00568F] rounded-full py-4"
          onPress={() => router.push("/reporte")}
        >
          <Text className="text-center text-white font-bold text-lg">
            Registrar
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
