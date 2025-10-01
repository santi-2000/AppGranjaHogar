import { View, Text } from "react-native";

import { Calendar } from "react-native-calendars";

export default function CalendarCard() {
  return (
    <View className="bg-white rounded-2xl p-4 shadow mt-4">
    
      <Calendar
        onDayPress={(day) => console.log("Día seleccionado", day)}
        markedDates={{
          "2024-06-26": { selected: true, selectedColor: "#2563EB" },
        }}
        theme={{
          textDayFontWeight: "500",
          arrowColor: "#2563EB",
        }}
      />
    </View>
  );
}
