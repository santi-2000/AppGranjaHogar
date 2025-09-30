import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function OutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white shadow">
        <TouchableOpacity onPress={() => router.push("/")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Nueva Salida</Text>
        <View className="bg-blue-500 rounded-full w-8 h-8 items-center justify-center">
          <Text className="text-white font-bold">Y</Text>
        </View>
      </View>

      {/* Contenido */}
      <View className="flex-1 p-4 space-y-6">
        {/* Producto */}
        <View>
          <Text className="text-gray-700 mb-1">Seleccione un producto</Text>
          <View className="bg-white rounded-xl border border-gray-300">
            <Picker selectedValue="">
              <Picker.Item label="Seleccione..." value="" />
              <Picker.Item label="Arroz" value="arroz" />
              <Picker.Item label="Frijoles" value="frijoles" />
              <Picker.Item label="Leche" value="leche" />
            </Picker>
          </View>
        </View>

        {/* Cantidad y unidad */}
        <View>
          <Text className="text-gray-700 mb-1">Cantidad</Text>
          <View className="flex-row space-x-2">
            <TextInput
              placeholder="Valor"
              keyboardType="numeric"
              className="flex-1 bg-white border border-gray-300 rounded-xl p-3"
            />
            <View className="w-32 bg-white rounded-xl border border-gray-300">
              <Picker selectedValue="">
                <Picker.Item label="Unidad" value="" />
                <Picker.Item label="Kg" value="kg" />
                <Picker.Item label="L" value="l" />
                <Picker.Item label="Pieza" value="pieza" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Departamento */}
        <View>
          <Text className="text-gray-700 mb-1">Departamento al que se dirige</Text>
          <View className="bg-white rounded-xl border border-gray-300">
            <Picker selectedValue="">
              <Picker.Item label="Seleccione..." value="" />
              <Picker.Item label="Cocina" value="cocina" />
              <Picker.Item label="Dormitorio" value="dormitorio" />
              <Picker.Item label="Enfermería" value="enfermeria" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Botón Registrar */}
      <View className="px-4 pb-6">
        <TouchableOpacity
          className="bg-blue-700 rounded-2xl py-4"
          onPress={() => router.push("/reporte")}
        >
          <Text className="text-center text-white font-bold text-lg">
            Registrar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
