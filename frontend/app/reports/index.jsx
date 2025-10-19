import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import TitleBar from "../../components/TitleBar";
import ButtonGreen from "../../components/Buttons/greenButton";
import ButtonBlue from "../../components/Buttons/blueButton";
import CalendarCard from "../../components/calendar/CalendarCard";
import ReportOption from "../../components/ReportOption/ReportOption";
import Subtitle from "../../components/Text/Text";
import useGetReports from "../../hooks/useGetReports";

export default function ReportsScreen() {
  const { selectDate, datesSelected, fetchFile, typesSelected, setTypesSelected } = useGetReports();

  return (
    <SafeAreaView className="flex-1 bg-[#F2F3F5]">
      <TitleBar title="Reportes" />

      <Subtitle size={16} color="#666" textAlign="center">
        Selecciona el periodo de reporte
      </Subtitle>

      <View className="flex-1 px-4">
        <CalendarCard
          selectDate={selectDate}
          datesSelected={datesSelected}
        />

        <View className="mt-4">
          <ReportOption
            label="Agregar inventario actual"
            style={{ marginLeft: 12 }}
            onCheck={() => {setTypesSelected([...typesSelected, 1]);}}
            onUncheck={() => {setTypesSelected(typesSelected.filter(type => type !== 1));}}
          />
          <ReportOption
            label="Agregar salidas de productos"
            style={{ marginLeft: 12 }}
            onCheck={() => {setTypesSelected([...typesSelected, 2]);}}
            onUncheck={() => {setTypesSelected(typesSelected.filter(type => type !== 2));}}
          />
          <ReportOption
            label="Agregar entradas de productos"
            style={{ marginLeft: 12 }}
            onCheck={() => { setTypesSelected([...typesSelected, 3]); }}
            onUncheck={() => { setTypesSelected(typesSelected.filter(type => type !== 3)); }}
          />

        </View>

        <View className="mt-8 space-y-3">
          <ButtonGreen
            label="Generar archivo de Excel"
            className="rounded-full"
            textSize={18}
            onPress={() => fetchFile('xlsx')}
          />
        </View>
        <View className="mt-2.5">
          <ButtonBlue
            label="Generar reporte PDF"
            className="rounded-full"
            textSize={18}
            onPress={() => fetchFile('pdf')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
