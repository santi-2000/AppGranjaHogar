import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import LinkHome from '../../components/Home/LinkHome';
import CreateHome from '../../components/Home/CreateHome';
import { Svg, Path } from 'react-native-svg'
import FolderPlusIcon from '../../components/Icons/FolderPlusIcon';
import FolderMinusIcon from '../../components/Icons/FolderMinusIcon';
import { IconCalendar } from '../../components/Icons/BoxIcon';
import BoxIcon from '../../components/Icons/BoxIcon';
import ClipboardIcon from '../../components/Icons/ClipboardIcon';
import GridIcon from '../../components/Icons/GridIcon';
import NotificationsHome from '../../components/Home/NotificationsHome';
import InfoIcon from '../../components/Icons/InfoIcon';
import Avatar from '../../components/Profile/Avatar';
import React, { useState } from 'react';

export default function HomeScreen() {
  const [isOpen, setIsOpen] = useState(false);
      const toggleSection = () => {
      setIsOpen(!isOpen);
      };
  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <View className="w-full flex-1 p-6">

        <View className="my-7 flex-row justify-between">
          <View>
            <Text className="text-5xl font-semibold">Hola, Yahir</Text>
            <Text className="text-lg font-semibold text-second">Bienvenido al almacén de Granja hogar</Text>
          </View>
          <View>
            <Avatar/>
          </View>
        </View>

        <View className="mb-4">
          <NotificationsHome icon={<InfoIcon/>} isOpen={isOpen} toggleSection={toggleSection}/>
        </View>
       <View className={`${isOpen ? 'hidden' : ''}`}>

        <View className="flex-row flex-wrap mb-4">
          <View className="w-1/2 pr-2">
            <CreateHome icon={<FolderPlusIcon />} directory={"/products/product-in"} text={"Nueva Entrada"} />
          </View>

          <View className="w-1/2 pl-2">
            <CreateHome icon={<FolderMinusIcon />} directory={"/products/product-out"} text={"Nueva Salida"} />
          </View>


        </View>

        <View className="mb-4">
          <LinkHome icon={<BoxIcon/>} directory={"/inventory"} text={"Inventario"} />
        </View>

        <View className="mb-4">
          <LinkHome icon={<ClipboardIcon/>} directory={"/reports"} text={"Reportes"} />
        </View>

        <View className="mb-4">
          <LinkHome icon={<GridIcon/>} directory={"/catalog"} text={"Catalogo"} />
        </View>

      </View>
       </View>

    </SafeAreaView>
  );
}

const styles = {

}