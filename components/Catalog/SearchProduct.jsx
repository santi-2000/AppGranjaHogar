import { Link } from "expo-router";
import { View, Text, Pressable, TextInput } from "react-native";
import ArrowRight from "../icons/ArrowRight";
import AddIcon from "../icons/AddIcon";
import SearchIcon from '../../components/icons/SearchIcon';
import CloseIcon from '../../components/icons/CloseIcon';


export default function SearchProduct() {
    return (
        <View className="bg-white w-full rounded-full px-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
                <SearchIcon />
                <TextInput className={styles.textInput} placeholder="Buscar producto"></TextInput>
            </View>
            <CloseIcon />
        </View>
    )
}

const styles = {
  textInput: "ml-3 text-gray-900 w-3/4 text-sm",
  submitButton: {
    backgroundColor: "#00568F",

  }
}