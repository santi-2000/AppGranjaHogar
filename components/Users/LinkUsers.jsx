import { Text, View } from 'react-native';
import { Link } from "expo-router";
import { Svg, Path } from 'react-native-svg'
import MoreHorizontal from '../icons/MoreHorizontal.jsx';
import Avatar from '../Profile/Avatar.jsx';

export default function LinkUsers({ bg, width, height, directory, text, email }) {
    return (
        <View className="p-4 rounded-xl bg-white border flex border-[#D9D9D9] w-full">
            <Link href={directory}>
                <View className="w-full flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <Avatar title={text[0]} bg={bg} width={width} height={height} directory={directory} />
                        <View className="ml-4">
                        <Text className="mb-1 font-semibold">{text}</Text>
                        <Text className="text-sm text-second">{email}</Text>
                        </View>
                    </View>
                    <View>
                        <MoreHorizontal/>
                    </View>
                </View>
            </Link>
        </View>
    )
}