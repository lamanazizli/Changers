const colorMap = {
  'İnşaat': '#FF00B7',
  'Dizayn': '#55E83B',
  'Marketinq': '#25DADA',
  'IT': '#0077FF',
};

export function getCategoryColor(category) {
  return colorMap[category] || '#FF2CA8';
}
