import { Link } from "expo-router";
import { View, Text, Pressable, TextInput } from "react-native";
import ArrowRight from "../Icons/ArrowRight";
import AddIcon from "../Icons/AddIcon";
import SearchIcon from '../../components/Icons/SearchIcon';
import CloseIcon from '../../components/Icons/CloseIcon';


export default function SearchProduct({ onSearch, value }) {
  return (
    <View className="bg-white w-full rounded-full px-3 py-2 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <View className="ml-2">
          <SearchIcon />
        </View>
        <TextInput className={styles.textInput} placeholder="Buscar producto" onChangeText={onSearch} value={value}></TextInput>
      </View>
    </View>
  )
}

const styles = {
  textInput: "ml-4 text-gray-900 w-3/4 text-sm",
  submitButton: {
    backgroundColor: "#00568F",

  }
}