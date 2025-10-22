import { Text, View } from 'react-native';
import { Link } from "expo-router";
import { Svg, Path } from 'react-native-svg'
import MoreHorizontal from '../Icons/MoreHorizontal.jsx';
import Avatar from '../Profile/Avatar.jsx';
import { capitalizeFirstLetterEachWord } from '../../utils/textUtil.js';

export default function LinkUsers({ width, height, directory, text, email }) {
    return (
        <View className="p-4 rounded-xl bg-white flex  w-full">
            <Link href={directory}>
                <View className="w-full flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <Avatar title={text} width={width} height={height} directory={directory} />
                        <View className="ml-4">
                            <Text className="mb-1 font-semibold">{capitalizeFirstLetterEachWord(text)}</Text>
                            <Text className="text-sm text-second">{capitalizeFirstLetterEachWord(email)}</Text>
                        </View>
                    </View>
                    <View>
                        <MoreHorizontal />
                    </View>
                </View>
            </Link>
        </View>
    )
}