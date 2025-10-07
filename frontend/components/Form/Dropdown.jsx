/* import React, { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]);

  return (
    <View className="p-4 bg-gray-100 rounded-lg">
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={{ marginBottom: 10 }}
        style={{ backgroundColor: "white" }}
        dropDownContainerStyle={{ backgroundColor: "white" }}
      />
    </View>
  );
}
 */