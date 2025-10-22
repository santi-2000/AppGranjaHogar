/** 
 * @module ManageUsersScreen
 * @description This module defines the ManageUsersScreen component which allows administrators
 *              to manage user accounts, including adding new users and editing existing ones.
 * 
 * @author Carlos Alejandro Ortiz Caro
 */

import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserPlus from '../../../components/Icons/UserPlus';
import TitleBar from '../../../components/TitleBar';
import LinkHome from '../../../components/Home/LinkHome';
import LinkUsers from '../../../components/Users/LinkUsers';
import useGetUsers from "../../../hooks/useGetUsers";
import { useEffect } from 'react';

export default function ManageUsersScreen() {
  const { users, fetchUsers, error } = useGetUsers();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUsers();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Usuarios"} />

      <View className="w-full flex-1 px-6">


        <View className="mb-4">
          <LinkHome icon={<UserPlus />} directory={"/settings/manage-users/new-user"} text={"Registrar nuevo usuario"} />
        </View>

        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View className="mb-2">
              <LinkUsers width={50} height={50} directory={`/settings/manage-users/edit-user/${item.id}`} text={`${item.name} ${item.lastName}`} email={item.username} />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-8">
              <Text className="text-gray-500 text-center">No hay usuarios</Text>
            </View>
          }
        />
      </View>

    </SafeAreaView>
  );
}
