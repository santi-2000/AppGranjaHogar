import { Text, View } from 'react-native';
import { Link } from "expo-router";
import { Svg, Path } from 'react-native-svg'

export default function CreateHome({ icon, text, directory }) {
  return (
    <View className="bg-white p-4 rounded-xl">
      <View className="flex-row gap-3">
        <View className="">
          {icon}
        </View>
        <Text className="mb-4 text-second">{text}</Text>
      </View>
      <Link style={styles.submitButton} className="my-2 w-full py-2 px-4 rounded-xl items-center" href={directory}>
        <Text className="mt-4 text-white text-center">Crear</Text>
      </Link>
    </View>
  )
}

const styles = {
  submitButton: {
    backgroundColor: "#00568F",

  }
}