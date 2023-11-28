const typeColors = {
  Acier: '#B8B8D0',
  Combat: '#C03028',
  Insecte: '#A8B820',
  Normal: '#A8A878',
  Poison: '#A040A0',
  Roche: '#B8A038',
  Sol: '#E0C068',
  Spectre: '#705898',
  Vol: '#A890F0',
  Dragon: '#7038F8',
  Eau: '#A2DDF4',
  Électrik: '#F8D030',
  Feu: '#FFB444',
  Glace: '#98D8D8',
  Plante: '#B2FFE2',
  Psy: '#F85888',
  Ténèbres: '#705848',
} as const;

export type TypeColors = typeof typeColors;

export const getTypeColor = (typeName: keyof TypeColors) => {
  return typeColors[typeName] || '#A8A8A8';
};
  
const typeImages = {
  Acier: require('../assets/cardBackgrounds/bubbles.png'),
  Combat: require('../assets/cardBackgrounds/fire.png'),
  Insecte: require('../assets/cardBackgrounds/leafs.png'),
  Normal: require('../assets/cardBackgrounds/leafs.png'),
  Poison: require('../assets/cardBackgrounds/fire.png'),
  Roche: require('../assets/cardBackgrounds/fire.png'),
  Sol: require('../assets/cardBackgrounds/fire.png'),
  Spectre: require('../assets/cardBackgrounds/fire.png'),
  Vol: require('../assets/cardBackgrounds/leafs.png'),
  Dragon: require('../assets/cardBackgrounds/bubbles.png'),
  Eau: require('../assets/cardBackgrounds/bubbles.png'),
  Électrik: require('../assets/cardBackgrounds/fire.png'),
  Feu: require('../assets/cardBackgrounds/fire.png'),
  Glace: require('../assets/cardBackgrounds/bubbles.png'),
  Plante: require('../assets/cardBackgrounds/leafs.png'),
  Psy: require('../assets/cardBackgrounds/bubbles.png'),
  Ténèbres: require('../assets/cardBackgrounds/fire.png'),
} as const;

export type TypeImages = typeof typeImages;

export const getTypeImage = (typeName: keyof TypeImages) => {
  return typeImages[typeName] || require('../assets/cardBackgrounds/bubbles.png');
};