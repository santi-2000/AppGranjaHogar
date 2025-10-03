import { useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";

const SearchableDropdown = ({ options, selectedValue, setSelectedValue }) => {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showList, setShowList] = useState(false);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = options.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  };

  return (
    <View className="bg-white rounded-xl p-4">
      <TextInput
        placeholder="Buscar producto..."
        value={query}
        onChangeText={handleSearch}
        onFocus={() => setShowList(true)}
        className="bg-gray-100 px-4 py-3 rounded-lg"
      />
      {showList && (
        <FlatList
          data={filteredOptions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedValue(item);
                setQuery(item);
                setShowList(false);
              }}
              className="p-3 border-b border-gray-200"
            >
              <Text className="text-gray-800">{item}</Text>
            </Pressable>
          )}
          style={{ maxHeight: 200 }}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

export default SearchableDropdown;