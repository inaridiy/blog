import toMaterialStyle from 'material-color-hash';

export const colorGene = (title: string) => {
  const color1 = toMaterialStyle(title, 700);
  const color2 = toMaterialStyle(title + '_', 300);
  return ` linear-gradient(90deg,${color1.backgroundColor}, ${color2.backgroundColor})`;
};
