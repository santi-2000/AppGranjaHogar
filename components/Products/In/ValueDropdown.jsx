import React, { useState } from "react";
import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import ChevronDownIcon from "../../Icons/ChevronDownIcon"; 

export default function Dropdown({ selectedValue, setSelectedValue, options = [], title = "Seleccionar" }) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      {/* botón */}
      <Pressable
        onPress={() => setOpen(true)}
        className="bg-gray-50 rounded-xl px-4 py-4"
        accessibilityRole="button"
      >
        <View className="flex-row justify-between items-center">
          <Text className={selectedValue ? "text-gray-800" : "text-gray-500"}>
            {selectedValue || title}
          </Text>
          <ChevronDownIcon />
        </View>
      </Pressable>

      {/* opciones */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* cierra al tocar afuera y fondo oscuro */}
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            padding: 20,
          }}
          onPress={() => setOpen(false)}
        >
          {/* cuadro de opciones */}
          <Pressable
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              overflow: "hidden",
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginHorizontal: 16,
                marginTop: 12,
                marginBottom: 8,
              }}
            >
              {title}
            </Text>

            <ScrollView style={{ maxHeight: 300 }}>
              {options.map((opt) => {
                const selected = selectedValue === opt;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => {
                      setSelectedValue(opt);
                      setOpen(false);
                    }}
                    style={{
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      borderTopWidth: 1,
                      borderTopColor: "#F3F4F6",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: selected ? "#111827" : "#374151",
                        fontWeight: selected ? "600" : "400",
                      }}
                    >
                      {opt}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}