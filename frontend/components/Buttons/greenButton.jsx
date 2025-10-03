import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { cn } from "../../lib/utils.js";

export default function Button({
  label,
  onPress,
  variant = "secondary",
  disabled = false,
  className,
  textSize
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "rounded-3xl px-6 py-3 flex items-center justify-center",
        variant === "secondary" && "bg-[#3B634A]",
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
