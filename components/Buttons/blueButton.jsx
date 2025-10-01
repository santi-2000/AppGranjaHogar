import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { cn } from "../../lib/utils.js";

export default function ButtonBlue({
  label,
  onPress,
  disabled = false,
  className,
  textSize
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "px-6 py-3 flex items-center justify-center bg-[#00568F]",
        "rounded-3xl",
        disabled && "opacity-50",
        className
      )}
    >
      <Text
        style={{
          fontFamily: "InstrumentsSans-Regular",
          fontSize: textSize,                   
          color: "white",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
