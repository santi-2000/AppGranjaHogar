import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import ArrowRight from "../Icons/ArrowRight";
import AddIcon from "../Icons/AddIcon";

import ChevronUpIcon from "../Icons/ChevronUpIcon";
import ChevronDownIcon from "../Icons/ChevronDownIcon";
import TrashIcon from "../Icons/TrashIcon";

import { useState } from "react";


export default function ProductCatalog({ data }) {
    const [isOpen, setIsOpen] = useState()

    return (
        <Pressable onPress={() => setIsOpen(!isOpen)} className="justify-between items-center" >
            <View className={`${isOpen ? "bg-white" : "bg-gray-100"} border border-main py-4 px-3  mb-3 rounded-2xl `}>
                <View className="w-full flex-row justify-between">
                    <View className="flex-row items-center items-center">
                        <Text className="font-medium ml-3">{data.name}</Text>
                    </View>
                    <View>
                        <View className={`${isOpen ? "" : "hidden"}`}>
                            <ChevronUpIcon />
                        </View>
                        <View className={`${isOpen ? "hidden" : ""}`}>
                            <ChevronDownIcon />
                        </View>
                    </View>
                </View>
                <View className={`${isOpen ? "" : "hidden"} justify-start ml-3 mt-4`}>
                    <Text>Tipo: {data.type}</Text>
                    <Text>Categoría: {data.category}</Text>
                    <Text>Unidad: {data.unit}</Text>
                    
                    <View className="flex-row justify-between mt-4">
                        <Pressable className="flex-row rounded-2xl bg-gray-100 px-6 py-3 justify-center items-center">
                            <TrashIcon />
                            <Text className="ml-2">Eliminar</Text>
                        </Pressable>

                         <Pressable className="flex-row rounded-2xl bg-[#00568F] px-6 py-3 justify-center items-center">
                            <Text className="text-white">Editar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}