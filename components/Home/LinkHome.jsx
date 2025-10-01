import { Text, View } from 'react-native';
import { Link } from "expo-router";
import { Svg, Path } from 'react-native-svg'
import ArrowRight from '../Icons/ArrowRight';

export default function LinkHome({ icon, directory, text }) {
    return (
        <View className="p-4 rounded-xl bg-white border flex border-main w-full">
            <Link href={directory}>
                <View className="w-full flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        {icon}
                        <Text className="ml-3">{text}</Text>
                    </View>
                    <View>
                        <ArrowRight/>
                    </View>
                </View>
            </Link>
        </View>
    )
}