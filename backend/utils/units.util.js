export const getUnitNameById = (id) => {
    const unitNames = {
        1: "Kg",
        2: "L",
        3: "Pcs"
    };
    return unitNames[id] || "Unidad desconocida";
}
