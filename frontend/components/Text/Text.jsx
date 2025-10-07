import React from "react";
import { Text } from "react-native";

export default function Subtitle({ 
    children, 
    size = 16, 
    color = "#333", 
    className, 
    textAlign = "center"}) {
  return (
    <Text
      style={{
        fontFamily: "InstrumentsSans-Regular",
        fontSize: size,
        color: color,
        textAlign: textAlign,
      }}
      className={className}
    >
      {children}
    </Text>
  );
}
