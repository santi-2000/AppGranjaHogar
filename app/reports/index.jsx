
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import TitleBar from "../../components/TitleBar";
import ButtonGreen from "../../components/Buttons/greenButton";
import ButtonBlue from "../../components/Buttons/blueButton";
import CalendarCard from "../../components/calendar/CalendarCard";
import ReportOption from "../../components/ReportOption/ReportOption";
import Subtitle from "../../components/Text/Text";

export default function ReportsScreen() {
  const [range, setRange] = useState({ start: new Date(2024, 5, 10), end: new Date(2024, 5, 26) });
  const [includeInventory, setIncludeInventory] = useState(true);
  const [includeOut, setIncludeOut] = useState(true);
  const [includeIn, setIncludeIn] = useState(true);

  const onExcel = () => Alert.alert("Excel", "Aquí disparas la generación del archivo de Excel.");
  const onPdf = () => Alert.alert("PDF", "Aquí disparas la generación del reporte PDF.");

  return (
    <SafeAreaView className="flex-1 bg-[#F2F3F5]">
      <TitleBar title="Reportes"/>

        <Subtitle size={16} color="#666" textAlign="center">
          Selecciona el periodo de reporte
        </Subtitle>

      <View className="flex-1 px-4">
        <CalendarCard />
        <View className="mt-4">
          <ReportOption label="Agregar inventario actual" 
                        style={{marginLeft: 12}}/>
          <ReportOption label="Agregar salidas de productos" 
                        style={{marginLeft: 12}}/>
          <ReportOption label="Agregar entradas de productos" 
                        style={{marginLeft: 12}}/>
                        
        </View>

        <View className="mt-8 space-y-3">
          <ButtonGreen
            label="Generar archivo de Excel"
            className="rounded-full"
            textSize={18}
            onPress={() => console.log("Excel generado")}
          />
          </View>
          <View className="mt-2.5">
          <ButtonBlue
            label="Generar reporte PDF"
            className="rounded-full"
            textSize={18}
            onPress={() => console.log("PDF generado")}
          />
        </View>
      </View>

    </SafeAreaView>
  );
}
