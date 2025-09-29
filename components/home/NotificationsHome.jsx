import { Text, View } from 'react-native';
import { Link } from "expo-router";
import { Svg, Path } from 'react-native-svg'

export default function NotificationsHome({ icon, text, directory }) {
    return (
        <View className="bg-white p-4 rounded-xl border border-main">
            <View className="flex-row gap-3">
                <View className="">
                    {icon}
                </View>
                <Text className="mb-4 text-second">Notificaciones recientes</Text>
            </View>
            <View className="my-2">
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
            </View>
            <Link style={styles.submitButton} className="my-2 w-full py-2 px-4 rounded-xl items-center" href={"#"}>
                <Text className="mt-4 text-white text-center">Ver más</Text>
            </Link>
        </View>
    )
}

const styles = {
    submitButton: {
        backgroundColor: "#00568F",
    }
}