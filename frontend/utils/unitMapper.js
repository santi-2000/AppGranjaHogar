/**
 * Returns the name of a unit based on its ID.
 * @param {number} unitId - The numeric ID of the unit.
 * @returns {string} The display name of the unit.
 */
export const getUnitNameById = (unitId) => {
  switch (unitId) {
    case 1:
      return "Masa (Kg)";
    case 2:
      return "Volumen (L)";
    case 3:
      return "Piezas (Pcs)";
    default:
      return "Unidad desconocida";
  }
};