import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function ReportOption({ label, style, onPress = () => {}, onCheck = () => {}, onUncheck = () => {} }) {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable
      onPress={() => {
        setChecked(!checked);
        if (!checked) {
          onCheck();
        } else {
          onUncheck();
        }
        onPress();
      }}
      style={{
        paddingVertical: 8,
      }}
    >
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
          },
          style,
        ]}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderWidth: 2,
            borderColor: "#333",
            borderRadius: 4,
            backgroundColor: checked ? "#00568F" : "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {checked && <Text style={{ color: "white", fontWeight: "bold" }}>✓</Text>}
        </View>

        <Text
          style={{
            marginLeft: 12,
            fontSize: 16,
            fontFamily: "InstrumentsSans-Regular",
            color: "#333",
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
