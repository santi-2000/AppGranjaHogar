import { useState, useMemo } from 'react';
import { Text, View, TextInput, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import TitleBar from '../../../../components/TitleBar';
import ButtonRounded from '../../../../components/Form/ButtonRounded';
import useCreateUser from '../../../../hooks/useCreateUser';
import PermissionRow from '../../../../components/Form/PermissionRow';

/**
 * Screen component for creating new users.
 * @module screens/NewUserScreen
 * @description This screen provides a form interface for administrators to create new users
 *              with specific permissions. It includes fields for name, last name, username,
 *              password, and permission selection.
 * @returns {JSX.Element} The NewUserScreen component
 * 
 * @author Renata Soto Bravo
 * 
 * @example
 * // This screen is accessed via navigation
 * router.push('/settings/manage-users/new-user');
 */

const permissions = [
  { label: 'Entradas de productos', value: 'products-entries' },
  { label: 'Salidas de productos', value: 'products-outs' },
  { label: 'Generar reportes', value: 'generate-reports' },
  { label: 'Editar catálogo', value: 'edit-catalog' },
  { label: 'Gestionar usuarios', value: 'manage-users' },
]

export default function NewUserScreen() {
  const { user, setUser, handleSubmit, togglePermission, createUser, loading, errors, error } = useCreateUser();

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Nuevo usuario"} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="px-6" contentContainerStyle={{ flexGrow: 1 }}>

            <View className="bg-white rounded-2xl p-4">
              <Text className="text-lg font-semibold mb-2">Nombre</Text>
              <TextInput
                placeholder="Nombre"
                value={user.name}
                onChangeText={(text) => setUser({ ...user, name: text })}
                className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
                autoCapitalize="none"
              />
              {errors.name ? <Text className="text-red-600 mt-1">{errors.name}</Text> : null}

              <Text className="text-lg font-semibold mt-6 mb-2">Apellido</Text>
              <TextInput
                placeholder="Apellido"
                value={user.lastName}
                onChangeText={(text) => setUser({ ...user, lastName: text })}
                className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
                autoCapitalize="none"
              />
              {errors.lastName ? <Text className="text-red-600 mt-1">{errors.lastName}</Text> : null}

              <Text className="text-lg font-semibold mt-6 mb-2">Usuario</Text>
              <TextInput
                placeholder="Nombre de usuario"
                value={user.username}
                onChangeText={(text) => setUser({ ...user, username: text })}
                className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
                autoCapitalize="none"
              />
              {errors.username ? <Text className="text-red-600 mt-1">{errors.username}</Text> : null}

              <Text className="text-lg font-semibold mt-6 mb-2">Contraseña</Text>
              <TextInput
                placeholder="••••••••••"
                value={user.password}
                onChangeText={(text) => setUser({ ...user, password: text })}
                className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
                autoCapitalize="none"
                secureTextEntry
              />
              {errors.password ? <Text className="text-red-600 mt-1">{errors.password}</Text> : null}

              <Text className="text-lg font-semibold mt-6 mb-3">Permisos</Text>

              <View className="gap-y-3">
                {permissions.map((perm) => (
                  <PermissionRow
                    key={perm.value}
                    label={perm.label}
                    value={user?.permissions ? user.permissions.includes(perm.value) : false}
                    onValueChange={() => { togglePermission(perm.value) }}
                  />
                ))}
              </View>
            </View>

            <View className="mt-6">
              <ButtonRounded
                text={loading ? "Creando..." : "Guardar"}
                disabled={loading}
                action={handleSubmit}
              />
            </View>

            {error && (
              <View className="mt-4">
                <Text className="text-red-600 text-center">{error}</Text>
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const cardShadow = {
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};
