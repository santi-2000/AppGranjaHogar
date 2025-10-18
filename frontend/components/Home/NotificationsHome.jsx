import { Pressable, Text, View } from 'react-native';
import { Link } from "expo-router";
import { Svg, Path } from 'react-native-svg'
import React, { useEffect, useState } from 'react';
import useNotifications from '../hooks/useNotifications.jsx';

export default function NotificationsHome({ icon, isOpen, toggleSection }) {
  const { fetchNotifications, notifications, error } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View className="bg-white p-4 rounded-xl border border-main">
      <View className="flex-row gap-3">
        <View>{icon}</View>
        <Text className="mb-4 text-second">Notificaciones recientes</Text>
      </View>

      <View className={`my-2 ${isOpen ? "h-3/4" : "max-h-10"} overflow-hidden`}>
        {error ? (
          <Text className="text-red-500">Error: {error}</Text>
        ) : notifications.length === 0 ? (
          <Text>No hay notificaciones</Text>
        ) : (
          notifications.map((n) => (
            <Text key={n.id} className="font-medium">
              - {n.title}: {n.content}
            </Text>
          ))
        )}
      </View>

      <Pressable
        className="bg-[#00568F] justify-center my-2 w-full py-4 px-4 rounded-xl items-center"
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