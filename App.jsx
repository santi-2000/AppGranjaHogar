import { View, Text } from 'react-native';
import './global.css';

export default function App() {
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <View className='bg-red-200'>
          <Text className='border-gray-300 border'>test</Text>
        </View>
      </View>
    </>
  );
}
