import { useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleBar from "../../components/TitleBar";
import CalendarRange from "../../components/Reportes/CalendarRange";
import OptionRow from "../../components/Reportes/OptionRow";
import ReportActionButton from "../../components/Reportes/ReportActionButton";
import ClipboardIcon from "../../components/Icons/ClipboardIcon.jsx";

export default function ReportsScreen() {
  const [range, setRange] = useState({ start: new Date(2024, 5, 10), end: new Date(2024, 5, 26) });
  const [includeInventory, setIncludeInventory] = useState(true);
  const [includeOut, setIncludeOut] = useState(true);
  const [includeIn, setIncludeIn] = useState(true);

  const onExcel = () => Alert.alert("Excel", "Aquí disparas la generación del archivo de Excel.");
  const onPdf = () => Alert.alert("PDF", "Aquí disparas la generación del reporte PDF.");

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Reportes"} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <Text className="text-neutral-500 text-base mt-2 mb-3">
          Seleccionar periodo de reporte
        </Text>

        <View className="rounded-2xl bg-white shadow-sm" style={{ elevation: 1 }}>
          <CalendarRange value={range} onChange={setRange} />
        </View>

        <View className="mt-4 space-y-3">
          <OptionRow label="Agregar inventario actual" value={includeInventory} onChange={setIncludeInventory} />
          <OptionRow label="Agregar salidas de productos" value={includeOut} onChange={setIncludeOut} />
          <OptionRow label="Agregar entradas de productos" value={includeIn} onChange={setIncludeIn} />
        </View>

        <View className="mt-6 space-y-3">
          <ReportActionButton
            title="Generar archivo de excel"
            variant="primary"
            onPress={onExcel}

          />
          <ReportActionButton
            title="Generar reporte pdf"
            variant="secondary"
            onPress={onPdf}

          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
