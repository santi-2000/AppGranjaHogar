import { useState, useMemo } from 'react';
import { Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import TitleBar from '../../../../components/TitleBar';
import ButtonRounded from '../../../../components/Form/ButtonRounded';

const roles = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Cocina', value: 'kitchen' },
  { label: 'Comedor', value: 'dining' },
];

const defaultPermissionsByRole = {
  admin: {
    productIn: true,
    productOut: true,
    reports: true,
    editCatalog: true,
    manageUsers: true,
  },
  kitchen: {
    productIn: true,
    productOut: true,
    reports: false,
    editCatalog: false,
    manageUsers: false,
  },
  dining: {
    productIn: false,
    productOut: true,
    reports: false,
    editCatalog: false,
    manageUsers: false,
  },
};

export default function NewUserScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roles[0].value);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [permissions, setPermissions] = useState(defaultPermissionsByRole[roles[0].value]);

  const [errors, setErrors] = useState({});

  const roleLabel = useMemo(() => roles.find(r => r.value === role)?.label ?? '', [role]);

  const handleSelectRole = (nextValue) => {
    setRole(nextValue);
    setPermissions(defaultPermissionsByRole[nextValue]);
    setShowRoleDropdown(false);
  };

  const togglePermission = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Requerido';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Correo inválido';
    if (password.length < 8) nextErrors.password = 'Mínimo 8 caracteres';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const payload = { name: name.trim(), email: email.trim(), password, role, permissions };
    console.log('Nuevo usuario:', payload);
    router.back();
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Nuevo usuario"} />

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="bg-white rounded-2xl p-4" style={cardShadow}>
          <Text className="text-lg font-semibold mb-2">Nombre</Text>
          <TextInput
            placeholder="Value"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
            autoCapitalize="words"
          />
          {errors.name ? <Text className="text-red-600 mt-1">{errors.name}</Text> : null}

          <Text className="text-lg font-semibold mt-6 mb-2">Correo electrónico</Text>
          <TextInput
            placeholder="Value"
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.email ? <Text className="text-red-600 mt-1">{errors.email}</Text> : null}

          <Text className="text-lg font-semibold mt-6 mb-2">Contraseña</Text>
          <TextInput
            placeholder="••••••••••"
            value={password}
            onChangeText={setPassword}
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
            secureTextEntry
          />
          {errors.password ? <Text className="text-red-600 mt-1">{errors.password}</Text> : null}

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
            <PermissionRow
              label="Entradas de productos"
              value={permissions.productIn}
              onValueChange={() => togglePermission('productIn')}
            />
            <PermissionRow
              label="Salidas de productos"
              value={permissions.productOut}
              onValueChange={() => togglePermission('productOut')}
            />
            <PermissionRow
              label="Generar reportes"
              value={permissions.reports}
              onValueChange={() => togglePermission('reports')}
            />
            <PermissionRow
              label="Editar catálogo"
              value={permissions.editCatalog}
              onValueChange={() => togglePermission('editCatalog')}
            />
            <PermissionRow
              label="Gestionar usuarios"
              value={permissions.manageUsers}
              onValueChange={() => togglePermission('manageUsers')}
            />
          </View>
        </View>

        <View className="mt-6">
          <ButtonRounded text="Guardar" action={handleSubmit} />
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
