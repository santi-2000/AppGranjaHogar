const COLORS = [
  '#b36b6b', '#b37f6b', '#b3b36b', '#6bb380', '#6b99b3',
  '#9b6bb3', '#b37a8a', '#7b6bb3', '#6bb3a9', '#b3ae6b',
  '#b38b90', '#7f9abb', '#6bb394', '#b37b65', '#9eb36b',
  '#a36bb3', '#b3b36b', '#6b9b91', '#b36b9b', '#917fb3',
  '#b39ca2', '#b3a1af', '#6b9b7b', '#b36b90', '#b3976b',
  '#7fa391', '#b39ca4', '#9bbe6b', '#6b8cb3', '#8c7fb3'
];

export function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}
