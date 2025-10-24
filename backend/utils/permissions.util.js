export const convertPermissionsArrayByNameToId = (permissionsArray) => {
    const permissionMap = permissionObjectByName();
    return permissionsArray.map(permission => permissionMap[permission]);
}

export const permissionObjectById = () => {
    return {
        1: 'admin',
        2: 'products-entries',
        3: 'products-outs',
        4: 'generate-reports',
        5: 'edit-catalog',
        6: 'manage-users'
    }
}

export const permissionObjectByName = () => {
    return {
        'admin': 1,
        'products-entries': 2,
        'products-outs': 3,
        'generate-reports': 4,
        'edit-catalog': 5,
        'manage-users': 6
    }
}