import { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import ArrowRight from "../Icons/ArrowRight.jsx";

function sameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function isBetween(d, start, end) {
  if (!start || !end) return false;
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return x > s && x < e;
}

export default function CalendarRange({ value, onChange }) {
  const [cursor, setCursor] = useState(value?.start ?? new Date());

  const grid = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startOffset = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);
    while (cells.length < 42) cells.push(null);
    return cells;
  }, [cursor]);

  const start = value?.start;
  const end = value?.end;
  const onTapDay = (day) => {
    if (!day) return;
    if (!start || (start && end)) onChange?.({ start: day, end: day });
    else if (day < start) onChange?.({ start: day, end: start });
    else onChange?.({ start, end: day });
  };

  const monthLabel = cursor.toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });

  return (
    <View>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2 px-4 pt-4">
        <Text className="text-neutral-800 font-semibold text-lg capitalize">
          {monthLabel}
        </Text>
        <View className="flex-row gap-x-2">
          <Pressable
            onPress={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
            }
            className="px-3 py-2 rounded-xl bg-neutral-100"
          >
            <View style={{ transform: [{ scaleX: -1 }] }}>
              <ArrowRight />
            </View>
          </Pressable>
          <Pressable
            onPress={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
            }
            className="px-3 py-2 rounded-xl bg-neutral-100"
          >
            <ArrowRight />
          </Pressable>
        </View>
      </View>

      {/* Weekdays */}
      <View className="flex-row mb-1 px-4">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
          <View key={d} className="flex-1 items-center py-1">
            <Text className="text-[11px] text-neutral-400">{d}</Text>
          </View>
        ))}
      </View>

      {/* Grid (edge-to-edge) */}
      <View className="flex-row flex-wrap">
        {grid.map((d, idx) => {
          const isStart = d && sameDay(d, start);
          const isEnd = d && sameDay(d, end);
          const inRange = d && isBetween(d, start, end);
          return (
            <Pressable
              key={idx}
              disabled={!d}
              onPress={() => onTapDay(d)}
              className="w-[14.2857%] aspect-square items-center justify-center"
            >
              {d ? (
                <View
                  className="w-8 h-8 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: isStart || isEnd
                      ? "#CFE6FF"
                      : inRange
                      ? "#E8F3FF"
                      : "transparent",
                  }}
                >
                  <Text
                    className="text-base"
                    style={{
                      color: isStart || isEnd ? "#0A67C9" : "#1f2937",
                    }}
                  >
                    {d.getDate()}
                  </Text>
                </View>
              ) : (
                <View className="w-8 h-8" />
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Summary */}
      <View className="mt-3 flex-row justify-between px-4 pb-4">
        <Text className="text-neutral-500">
          Inicio:{" "}
          <Text className="text-neutral-800 font-medium">
            {start ? start.toLocaleDateString("es-MX") : "-"}
          </Text>
        </Text>
        <Text className="text-neutral-500">
          Fin:{" "}
          <Text className="text-neutral-800 font-medium">
            {end ? end.toLocaleDateString("es-MX") : "-"}
          </Text>
        </Text>
      </View>
    </View>
  );
}
