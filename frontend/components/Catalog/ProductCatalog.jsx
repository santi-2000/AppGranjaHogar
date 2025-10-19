import { Link, useRouter } from "expo-router";
import { View, Text, Pressable, Alert } from "react-native";
import ArrowRight from "../Icons/ArrowRight";
import AddIcon from "../Icons/AddIcon";

import ChevronUpIcon from "../Icons/ChevronUpIcon";
import ChevronDownIcon from "../Icons/ChevronDownIcon";
import TrashIcon from "../Icons/TrashIcon";

import { useState } from "react";

import useDeleteProduct from "../../hooks/useDeleteProduct";


export default function ProductCatalog({ data }) {
    const { deleteProduct, loading, error } = useDeleteProduct();
    const [isOpen, setIsOpen] = useState()
    const router = useRouter()

    const handleDeleteConfirm = () => {
        Alert.alert(
            "¿Estás seguro?", 
            "Esta acción no se puede deshacer.", 
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Eliminación cancelada"),
                    style: "cancel" 
                },

                {
                    text: "Sí, eliminar",
                    onPress: async () => {
                        await deleteProduct(data.id);
                    },
                    style: "destructive" 
                }
            ],
            { cancelable: true } 
        );
    };

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
                    <Text>Perecedero: {data.type ? "Sí" : "No"}</Text>
                    <Text>Categoría: {data.category}</Text>
                    <Text>Unidad: {data.unit}</Text>
                    
                    <View className="flex-row justify-between mt-4">

                        <Pressable 
                        onPress={handleDeleteConfirm}
                        className="flex-row rounded-2xl bg-gray-100 px-6 py-3 justify-center items-center">
                            <TrashIcon />
                            <Text className="ml-2">Eliminar</Text>
                        </Pressable>

                         <Pressable
                         onPress={() => router.push(`/products/edit/${data.id}`)}
                         className="flex-row rounded-2xl bg-[#00568F] px-6 py-3 justify-center items-center"
                         >
                            <Text className="text-white">Editar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}