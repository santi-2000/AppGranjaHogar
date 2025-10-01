import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TitleBar from '../../../../../components/TitleBar';
import ButtonRounded from '../../../../../components/Form/ButtonRounded';

const roles = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Cocina', value: 'kitchen' },
  { label: 'Comedor', value: 'dining' },
];

const defaultPermissionsByRole = {
  admin: { productIn: true, productOut: true, reports: true, editCatalog: true, manageUsers: true },
  kitchen: { productIn: true, productOut: true, reports: false, editCatalog: false, manageUsers: false },
  dining: { productIn: false, productOut: true, reports: false, editCatalog: false, manageUsers: false },
};

export default function EditUserScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const mockById = {
    '0': { name: 'Yahir Alfredo Tapia Sifuentes', email: 'yahir.tapia@granjahogar.com', role: 'admin' },
    '1': { name: 'Ana Lopez', email: 'ana.lopez@granjahogar.com', role: 'kitchen' },
    '2': { name: 'Jared Marquez', email: 'jared.marquez@granjahogar.com', role: 'dining' },
  };
  const initial = mockById[id] ?? { name: '', email: '', role: 'admin' };

  const [name, setName] = useState(initial.name);
  const [role, setRole] = useState(initial.role);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [permissions, setPermissions] = useState(defaultPermissionsByRole[initial.role]);

  const roleLabel = useMemo(() => roles.find(r => r.value === role)?.label ?? '', [role]);

  const handleSelectRole = (nextValue) => {
    setRole(nextValue);
    setPermissions(defaultPermissionsByRole[nextValue]);
    setShowRoleDropdown(false);
  };

  const togglePermission = (key) => setPermissions(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    console.log('Editar usuario', { id, name, role, permissions });
    router.back();
  };

  const handleDelete = () => {
    Alert.alert('Eliminar Usuario', 'Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => { console.log('Eliminar usuario', { id }); router.back(); } },
    ]);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Editar permisos"} />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="bg-white rounded-2xl p-4" style={cardShadow}>
          <Pressable onPress={handleDelete} className="self-start mb-4 border border-gray-300 rounded-lg px-3 py-2 flex-row items-center">
            <Text className="text-red-600 mr-2">🗑️</Text>
            <Text className="text-gray-900">Eliminar Usuario</Text>
          </Pressable>

          <Text className="text-lg font-semibold mb-2">Nombre</Text>
          <TextInput
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
          />

          <Text className="text-lg font-semibold mt-6 mb-2">Rol</Text>
          <Pressable
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white flex-row justify-between items-center"
            onPress={() => setShowRoleDropdown(prev => !prev)}
          >
            <Text className="text-gray-900">{roleLabel}</Text>
            <Text className="text-gray-500">{showRoleDropdown ? '▲' : '▼'}</Text>
          </Pressable>
          {showRoleDropdown && (
            <View className="mt-2 border border-gray-300 rounded-xl overflow-hidden bg-white">
              {roles.map((r, index) => (
                <Pressable
                  key={r.value}
                  onPress={() => handleSelectRole(r.value)}
                  className="px-4 py-3 flex-row justify-between items-center"
                  style={index + 1 < roles.length ? { borderBottomWidth: 1, borderBottomColor: '#e5e7eb' } : null}
                >
                  <Text className="text-gray-900">{r.label}</Text>
                  {role === r.value ? <Text className="text-[#00568F]">✓</Text> : null}
                </Pressable>
              ))}
            </View>
          )}

          <Text className="text-lg font-semibold mt-6 mb-3">Permisos</Text>

          <View className="gap-y-3">
            <PermissionRow label="Entradas de productos" value={permissions.productIn} onValueChange={() => togglePermission('productIn')} />
            <PermissionRow label="Salidas de productos" value={permissions.productOut} onValueChange={() => togglePermission('productOut')} />
            <PermissionRow label="Generar reportes" value={permissions.reports} onValueChange={() => togglePermission('reports')} />
            <PermissionRow label="Editar catálogo" value={permissions.editCatalog} onValueChange={() => togglePermission('editCatalog')} />
            <PermissionRow label="Gestionar usuarios" value={permissions.manageUsers} onValueChange={() => togglePermission('manageUsers')} />
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
      <Text className="text-base text-gray-900 ml-3">{label}</Text>
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