import { View, Text } from "react-native";

import { Calendar } from "react-native-calendars";

export default function CalendarCard({ selectDate, datesSelected }) {

  return (
    <View className="bg-white rounded-2xl p-4 shadow mt-4">
    
      <Calendar
        onDayPress={(day) => selectDate(day)}
        //markingType={'period'}
        markedDates={datesSelected}
        theme={{
          textDayFontWeight: "500",
          arrowColor: "#2563EB",
        }}
      />
    </View>
  );
}
