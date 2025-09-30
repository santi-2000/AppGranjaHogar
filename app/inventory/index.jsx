import { Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import TitleBar from '../../components/TitleBar';
import ArrowRightBarIcon from "../../components/icons/ArrowRighBartIcon";

export default function InventaryScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Inventario"} />
      <View className="bg-transparent w-90 p-4">

          {/* search bar */}
            <View accessibilityRole='search' className="my-2">
                <TextInput className={styles.textInput} placeholder="Buscar producto" ></TextInput>
            </View>

            {/* navigation guide */}
            <View className="p-2.5 my-2">
                <View className="flex-row justify-center gap-4">
                    <View className="bg-zinc-800 rounded-lg p-2">
                        <Text className="text-white text-sm">1</Text>
                    </View>
                    <View className="bg-zinc-800 rounded-lg p-2">
                        <Text className="text-white text-sm">2</Text>
                    </View>
                    <View className="bg-zinc-800 rounded-lg p-2">
                        <Text className="text-white text-sm">3</Text>
                    </View>
                    <View className="bg-zinc-800 rounded-lg p-2">
                        <Text className="text-white text-sm">4</Text>
                    </View>
                </View>
            </View>


            {/* product listing */}
            <View className="p-2.5 my-2">
                <View className="flex-col gap-2">
                    <View className="border border-gray-300 rounded-lg">
                        <View className="flex-row justify-between">
                            <Text className={styles.text}>🍎 Manzana</Text>
                            <Text className={styles.text}>24 piezas</Text>
                        </View>
                    </View>
                   <View className="border border-gray-300 rounded-lg">
                       <View className="flex-row justify-between">
                            <Text className={styles.text}>🥛 Leche</Text>
                            <Text className={styles.text}>30 litros</Text>
                        </View>
                    </View>
                   <View className="border border-gray-300 rounded-lg">
                       <View className="flex-row justify-between">
                            <Text className={styles.text}>🍬 Dulces</Text>
                            <Text className={styles.text}>32 piezas</Text>
                        </View>
                    </View>
                   <View className="border border-gray-300 rounded-lg">
                       <View className="flex-row justify-between">
                            <Text className={styles.text}>🧼 Jabón</Text>
                            <Text className={styles.text}>16 piezas</Text>
                        </View>
                    </View>
                   <View className="border border-gray-300 rounded-lg">
                       <View className="flex-row justify-between">
                            <Text className={styles.text}>🦞 Langosta</Text>
                            <Text className={styles.text}>8 piezas</Text>
                        </View>
                    </View>
                   <View className="border border-gray-300 rounded-lg">
                       <View className="flex-row justify-between">
                            <Text className={styles.text}>🧂 Sal</Text>
                            <Text className={styles.text}>4 kilogramos</Text>
                        </View>
                    </View>
                </View>
            </View>



            {/* navigation panel below */}
            <View className="flex-row justify-between items-center">
                <View className="flex-row justify-between gap-4">
                    <ArrowRightBarIcon />
                    <Text className="text-lg justify-center">Previous</Text>
                 </View>
                     <Text className="text-lg">1</Text>
                 <View className="flex-row justify-between gap-4">
                     <Text className="text-lg">Next</Text>
                     <ArrowRightBarIcon rotate={180}/>
                 </View>
            </View>

            <View className="my-2 p-2">
                <Text className="bg-[#034977] text-white justify-center text-center text-3xl font-bold rounded-full p-2">Imprimir</Text>
                </View>

      </View>
    </SafeAreaView>
  );

}


  const styles = {
    textInput: "bg-white border border-gray-300 text-gray-900 text-sm rounded-full block w-full p-3",
    text: "text-black text-lg p-4 font-bold",
    submitButton: {
      backgroundColor: "#00568F",

    }
  }
