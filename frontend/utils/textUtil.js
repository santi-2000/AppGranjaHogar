export const capitalizeFirstLetter = (string) => {
  if (!string || typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeFirstLetterEachWord = (string) => {
  if (!string || typeof string !== 'string') return '';
  return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const removeAccents = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const normalizeString = (str) => {
  if (!str || typeof str !== 'string') return '';
  return removeAccents(str).toLowerCase();
};
