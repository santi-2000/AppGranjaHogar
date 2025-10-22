import { Alert } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import UsersProxy from '../proxies/UsersServiceProxy';
import EditUserVO from '../valueobjects/users/EditUserVO';

const useEditUser = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { putUser, deleteUser, getUserById } = UsersProxy();
    const [user, setUser] = useState({
        id: '',
        name: '',
        lastName: '',
        permissions: []
    });

    const [name, setName] = useState(user?.name);
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [permissions, setPermissions] = useState([
        { label: 'Administrador', value: 'admin' },
        { label: 'Entradas de productos', value: 'products-entries' },
        { label: 'Salidas de productos', value: 'products-outs' },
        { label: 'Generar reportes', value: 'generate-reports' },
        { label: 'Editar catálogo', value: 'edit-catalog' },
        { label: 'Gestionar usuarios', value: 'manage-users' },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await getUserById(id);

                setUser(userRes);
                console.log('User data:', userRes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const togglePermission = (key) => {
        console.log('Toggle permission', key);
        const newPermissions = user?.permissions ? [...user.permissions] : [];
        if (newPermissions.includes(key)) {
            const index = newPermissions.indexOf(key);
            newPermissions.splice(index, 1);
        } else {
            newPermissions.push(key);
        }
        setUser(prev => ({ ...prev, permissions: newPermissions }));
    };

    const handleSave = async () => {
        const userVo = new EditUserVO(user);
        const response = await putUser(id, userVo);
        console.log(response);
        router.back();
    };

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
                        await handleDeleteUser(id);
                        router.back();
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const handleDeleteUser = async (userId) => {
        setLoading(true);
        setError(null);
        let deletionResult = null;
        try {
            deletionResult = await deleteUser(userId);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        return deletionResult;
    };

    return {
        handleDeleteConfirm,
        handleSave,
        togglePermission,
        user,
        setName,
        permissions,
        loading,
        error
    };
};

export default useEditUser;
