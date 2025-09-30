import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import LinkHome from '../../components/home/LinkHome';
import CreateHome from '../../components/home/CreateHome';
import { Svg, Path } from 'react-native-svg'
import FolderPlusIcon from '../../components/icons/FolderPlusIcon';
import FolderMinusIcon from '../../components/icons/FolderMinusIcon';
import { IconCalendar } from '../../components/icons/BoxIcon';
import BoxIcon from '../../components/icons/BoxIcon';
import ClipboardIcon from '../../components/icons/ClipboardIcon';
import GridIcon from '../../components/icons/GridIcon';
import NotificationsHome from '../../components/home/NotificationsHome';
import InfoIcon from '../../components/icons/InfoIcon';
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

        <Link className="mb-5" href="/settings">
          <Text>settings</Text>
        </Link>
      </View>
       </View>

    </SafeAreaView>
  );
}

const styles = {

}