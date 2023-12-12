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
  Fée: '#f573f3',
} as const;

export const getTypeColor = (typeName: keyof TypeColors) => {
  return typeColors[typeName] || '#A8A8A8';
};

export type TypeColors = typeof typeColors;

const typeColorsSecondary = {
  Acier: '#606060', 
  Combat: '#691302', 
  Insecte: '#224a1a', 
  Normal: '#8B4513', 
  Poison: '#4d034b', 
  Roche: '#8B4513',  
  Sol: '#8B4513',  
  Spectre: '#483D8B',
  Vol: '#053987', 
  Dragon: '#4B0082', 
  Eau: '#011e4a', 
  Électrik: '#ad7503', 
  Feu: '#bf1913', 
  Glace: '#00BFFF', 
  Plante: '#096602', 
  Psy: '#9b04b3', 
  Ténèbres: '#2F4F4F', 
  Fée: '#850478',  
} as const;


export type TypeColorsSecondary = typeof typeColorsSecondary;

export const getTypeColorSecondary = (typeName: keyof TypeColorsSecondary) => {
  return typeColorsSecondary[typeName] || '#A8A8A8';
};
  
const typeImages = {
  Acier: require('../assets/cardBackgrounds/fire.png'),
  Combat: require('../assets/cardBackgrounds/fire.png'),
  Insecte: require('../assets/cardBackgrounds/leafs.png'),
  Normal: require('../assets/cardBackgrounds/leafs.png'),
  Poison: require('../assets/cardBackgrounds/fire.png'),
  Roche: require('../assets/cardBackgrounds/fire.png'),
  Sol: require('../assets/cardBackgrounds/fire.png'),
  Spectre: require('../assets/cardBackgrounds/fire.png'),
  Vol: require('../assets/cardBackgrounds/leafs.png'),
  Dragon: require('../assets/cardBackgrounds/fire.png'),
  Eau: require('../assets/cardBackgrounds/bubbles.png'),
  Électrik: require('../assets/cardBackgrounds/fire.png'),
  Feu: require('../assets/cardBackgrounds/fire.png'),
  Glace: require('../assets/cardBackgrounds/fire.png'),
  Plante: require('../assets/cardBackgrounds/leafs.png'),
  Psy: require('../assets/cardBackgrounds/fire.png'),
  Ténèbres: require('../assets/cardBackgrounds/fire.png'),
  Fée: require('../assets/cardBackgrounds/fire.png'),
} as const;

export type TypeImages = typeof typeImages;

export const getTypeImage = (typeName: keyof TypeImages) => {
  return typeImages[typeName] || require('../assets/cardBackgrounds/bubbles.png');
};