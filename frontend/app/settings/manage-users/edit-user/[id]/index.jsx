import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleBar from '../../../../../components/TitleBar';
import ButtonRounded from '../../../../../components/Form/ButtonRounded';
import useEditUser from '../../../../../hooks/useEditUser';
import TrashIcon from "../../../../../components/Icons/TrashIcon";

export default function EditUserScreen() {
  const {
    handleDeleteConfirm,
    handleSave,
    togglePermission,
    user,
    setName,
    permissions,
    loading,
    error
  } = useEditUser();

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Editar permisos"} />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="bg-white rounded-2xl p-4">
          <Pressable onPress={handleDeleteConfirm} className="self-start mb-4 border-[0.6px] border-gray-300 rounded-lg px-3 py-2 flex-row items-center">
            <Text className="text-red-600 mr-2">
              <TrashIcon width={16} height={16} />
            </Text>
            <Text className="text-gray-900">Eliminar Usuario</Text>
          </Pressable>

          <Text className="text-lg font-semibold mb-2">Nombre</Text>
          <TextInput
            placeholder="Nombre"
            value={user?.name}
            onChangeText={setName}
            className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
          />
          <Text className="text-lg mt-4 font-semibold mb-2">Apellidos</Text>
          <TextInput
            placeholder="Apellidos"
            value={user?.lastName}
            onChangeText={setName}
            className="bg-gray-50 rounded-xl px-4 py-4 text-gray-800"
          />

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
          <ButtonRounded text="Guardar cambios" action={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PermissionRow({ label, value, onValueChange }) {
  return (
    <Pressable onPress={onValueChange} className="flex-row items-center" accessibilityRole="checkbox" accessibilityState={{ checked: value }}>
      <Checkbox checked={value} />
      <Text className={`text-base text-gray-900 ml-3 ${value ? 'font-semibold' : 'font-normal'}`}>{label}</Text>
    </Pressable>
  );
}

function Checkbox({ checked }) {
  return (
    <View
      className={checked ? "w-6 h-6 rounded-md items-center justify-center" : "w-6 h-6 rounded-md"}
      style={{ borderWidth: 2, borderColor: checked ? '#0F172A' : '#CBD5E1', backgroundColor: checked ? '#0F172A' : 'white' }}
    >
      {checked ? <Text className="text-white" style={{ lineHeight: 16 }}>✓</Text> : null}
    </View>
  );
}

const cardShadow = {
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};