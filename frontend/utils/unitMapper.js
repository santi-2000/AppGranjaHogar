/**
 * Returns the name of a unit based on its ID.
 * @param {number} unitId - The numeric ID of the unit.
 * @returns {string} The display name of the unit.
 */
export const getUnitNameById = (unitId, simple=false) => {
  switch (unitId) {
    case 1:
      return simple ? "Kg" : "Masa (Kg)";
    case 2:
      return simple ? "L" : "Volumen (L)";
    case 3:
      return simple ? "Pcs" : "Piezas (Pcs)";
    default:
      return "Unidad desconocida";
  }
};