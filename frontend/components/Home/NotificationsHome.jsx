import { FlatList, Pressable, Text, View } from 'react-native';
import { Link } from "expo-router";
import { Svg, Path } from 'react-native-svg'
import React, { useEffect, useState } from 'react';
import useNotifications from '../../hooks/useNotifications.jsx';
import { capitalizeFirstLetter } from '../../utils/textUtil.js';

export default function NotificationsHome({ icon, isOpen, toggleSection }) {
  const { fetchNotifications, notifications, error } = useNotifications();

  return (
    <View className="bg-white p-4 rounded-xl">
      <View className="flex-row gap-3">
        <View>{icon}</View>
        <Text className="mb-4 text-second">Notificaciones recientes</Text>
      </View>

      <View className={`my-2 ${isOpen ? "h-3/4" : "max-h-10"} overflow-hidden`}>
        {error ?
          (<Text className="text-red-500">Error: {error}</Text>)

          : notifications?.length === 0 ?

            (<Text>No hay notificaciones</Text>)
            :
            (
              <FlatList
                data={notifications.slice(0, isOpen ? notifications.length : 3)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View key={item.id}>
                    <Text className="text-gray-700">
                      <Text className="mb-2 font-medium text-gray-700">
                        - {capitalizeFirstLetter(item.user_username)}:&nbsp;&nbsp;
                      </Text>
                      <Text className="ml-1 text-gray-700">
                        {capitalizeFirstLetter(item.content)}
                      </Text>
                    </Text>
                  </View>
                )}
                ListEmptyComponent={() => (
                  <Text>No hay notificaciones</Text>
                )}
              />

            )}
      </View>

      <Pressable
        className="bg-[#00568F] justify-center my-2 w-full py-2 mb-0 px-4 rounded-xl items-center"
        onPress={toggleSection}
      >
        <Text className="text-white">{isOpen ? "Ver menos" : "Ver más"}</Text>
      </Pressable>
    </View>
  );
}

const styles = {
  submitButton: {
    backgroundColor: "#00568F",
  }
}