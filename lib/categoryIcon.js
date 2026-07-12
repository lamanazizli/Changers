import { HardHat, Layers, Landmark, Sofa, Smartphone, Film, Bug, Ruler, BookOpen } from 'lucide-react';

const iconMap = {
  'Tikinti': HardHat,
  'Fasad': Layers,
  'Rəqəmsal Memarlıq': Landmark,
  'Arxitektura': Landmark,
  'İnteryer Dizayn': Sofa,
  'Daxili Dizayn': Sofa,
  'Digital Marketing': Smartphone,
  'Motion Dizayn': Film,
  'QA Testing': Bug,
  'BIM & AutoCAD': Ruler,
};

export function getCategoryIcon(category) {
  return iconMap[category] || BookOpen;
}
