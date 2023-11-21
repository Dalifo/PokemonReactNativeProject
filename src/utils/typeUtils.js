export const getTypeColor = (typeName) => {
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
    };
  
    return typeColors[typeName] || '#A8A8A8';
  };
  