import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TitleBar from '../../../../../components/TitleBar';
import ButtonRounded from '../../../../../components/Form/ButtonRounded';
import useDeleteUser from '../../../../../hooks/useDeleteUser';
import usePermissions from '../../../../../hooks/usePermissions';

const PERMISSION_IDS = {
  ADMIN: 1,             
  PRODUCT_ENTRIES: 2,   
  PRODUCT_OUTS: 3,      
  REPORTS: 4,           
  EDIT_CATALOG: 5,      
  MANAGE_USERS: 6,      
};

export default function EditUserScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { deleteUser, loading: deleteLoading } = useDeleteUser();
  const { 
    fetchUserPermissions, 
    updatePermissions, 
    loading: permissionsLoading, 
    error: permissionsError 
  } = usePermissions();

  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadUserPermissions();
  }, [id]);

  const loadUserPermissions = async () => {
    try {
      setInitialLoading(true);
      const userPerms = await fetchUserPermissions(id);

      const permIds = userPerms.getPermissionIds();
      setSelectedPermissions(permIds);
      
    } catch (err) {
      console.error('Error cargando permisos:', err);
      Alert.alert('Error', 'No se pudieron cargar los permisos del usuario');
    } finally {
      setInitialLoading(false);
    }
  };

  const togglePermission = (permissionId) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  const hasPermission = (permissionId) => {
    return selectedPermissions.includes(permissionId);
  };

  const handleSave = async () => {
    try {
      await updatePermissions(id, selectedPermissions);
      Alert.alert('Éxito', 'Permisos actualizados correctamente');
      router.back();
    } catch (err) {
      console.error('Error guardando permisos:', err);
      Alert.alert('Error', 'No se pudieron actualizar los permisos');
    }
  };

  const handleDeleteConfirm = () => {
    Alert.alert(
      "¿Estás seguro?", 
      "Esta acción no se puede deshacer.", 
      [
        {
          text: "Cancelar",
          style: "cancel" 
        },
        {
          text: "Sí, eliminar",
          onPress: async () => {
            await deleteUser(id);
            router.back();
          },
          style: "destructive" 
        }
      ],
      { cancelable: true } 
    );
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
        <TitleBar title={"Editar permisos"} />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#034977" />
          <Text className="text-gray-600 mt-4">Cargando permisos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F3F5", flex: 1 }}>
      <TitleBar title={"Editar permisos"} />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="bg-white rounded-2xl p-4" style={cardShadow}>
          <Pressable onPress={handleDeleteConfirm} className="self-start mb-4 border border-gray-300 rounded-lg px-3 py-2 flex-row items-center">
            <Text className="text-red-600 mr-2">🗑️</Text>
            <Text className="text-gray-900">Eliminar Usuario</Text>
          </Pressable>

          <Text className="text-lg font-semibold mb-2">Usuario ID: {id}</Text>

          {permissionsError && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <Text className="text-red-600">{permissionsError}</Text>
            </View>
          )}

          <Text className="text-lg font-semibold mt-6 mb-3">Permisos</Text>

          <View className="gap-y-3">
            <PermissionRow 
              label="Entrada de productos" 
              value={hasPermission(PERMISSION_IDS.PRODUCT_ENTRIES)} 
              onValueChange={() => togglePermission(PERMISSION_IDS.PRODUCT_ENTRIES)} 
            />
            <PermissionRow 
              label="Salidas de productos" 
              value={hasPermission(PERMISSION_IDS.PRODUCT_OUTS)} 
              onValueChange={() => togglePermission(PERMISSION_IDS.PRODUCT_OUTS)} 
            />
            <PermissionRow 
              label="Generar reportes" 
              value={hasPermission(PERMISSION_IDS.REPORTS)} 
              onValueChange={() => togglePermission(PERMISSION_IDS.REPORTS)} 
            />
            <PermissionRow 
              label="Editar catálogo" 
              value={hasPermission(PERMISSION_IDS.EDIT_CATALOG)} 
              onValueChange={() => togglePermission(PERMISSION_IDS.EDIT_CATALOG)} 
            />
            <PermissionRow 
              label="Gestionar usuarios" 
              value={hasPermission(PERMISSION_IDS.MANAGE_USERS)} 
              onValueChange={() => togglePermission(PERMISSION_IDS.MANAGE_USERS)} 
            />
          </View>
        </View>

        <View className="mt-6">
          <ButtonRounded 
            text={permissionsLoading ? "Guardando..." : "Guardar cambios"} 
            action={handleSave}
            disabled={permissionsLoading}
          />
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