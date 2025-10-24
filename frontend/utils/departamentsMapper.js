export const getDepartamentNameById = (departmentId) => {
    return departaments[departmentId] || "Departamento desconocido";
}

export const departamentsArray = [
    { id: 1, name: "Comedor" },
    { id: 2, name: "Cocina" },
    { id: 3, name: "Administración" }
]

const departaments = {
    1: "Comedor",
    2: "Cocina",
    3: "Administración",
};