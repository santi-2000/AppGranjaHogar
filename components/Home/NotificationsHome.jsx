import { Pressable, Text, View } from 'react-native';
import { Link } from "expo-router";
import { Svg, Path } from 'react-native-svg'
import React, { useState } from 'react';

export default function NotificationsHome({ icon, isOpen, toggleSection }) {


    return (
        <View className="bg-white p-4 rounded-xl border border-main">
            <View className="flex-row gap-3">
                <View className="">
                    {icon}
                </View>
                <Text className="mb-4 text-second">Notificaciones recientes</Text>
            </View>
            <View className= {`my-2 ${isOpen ? 'h-3/4' : 'max-h-10'} overflow-hidden`}>
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
                <Text className="font-medium">- Producto “Gelatinas” casi agotado.</Text>
                <Text className="font-medium">- Producto “Dulces” próximo a vencer.</Text>
            </View>
            <Pressable className="bg-[#00568F] justify-center my-2 w-full py-4 px-4 rounded-xl items-center" onPress={toggleSection}>
                <Text className="text-white" >{isOpen ? 'Ver menos' : 'Ver más'}</Text>
            </Pressable>
        </View>
    )
}

const styles = {
    submitButton: {
        backgroundColor: "#00568F",
    }
}