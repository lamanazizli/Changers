import { HardHat, Smartphone, Sofa, Monitor, BookOpen } from 'lucide-react';

const iconMap = {
  'İnşaat': HardHat,
  'Dizayn': Sofa,
  'Marketinq': Smartphone,
  'IT': Monitor,
};

export function getCategoryIcon(category) {
  return iconMap[category] || BookOpen;
}
