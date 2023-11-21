// useGetAllCards.tsx
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../api";
import { TypeColors } from "../utils/typeUtils";

export type Card = {
  pokedexId: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
    gmax: {
      regular: string;
      shiny: string;
    } | null;
  };
  types: {
    name: keyof TypeColors;
    image: string;
  }[];
  talents: {
    name: string;
    tc: boolean;
  }[];
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  resistances: {
    name: string;
    multiplier: number;
  }[];
  evolution: {
    pre: {
      pokedexId: number;
      name: string;
      condition: string;
    }[];
    next: {
      pokedexId: number;
      name: string;
      condition: string;
    }[] | null;
    mega: {
      orbe: string;
      sprites: {
        regular: string;
        shiny: string;
      };
    }[] | null;
  };
  height: string;
  weight: string;
  egg_groups: string[];
};



type Response = Card[];

export const useGetAllCards = () => {
  const { data, ...rest } = useQuery<Response>({
    queryKey: ["cards"],
    queryFn: ApiClient.useGetAllCards,
  });

  const filteredData = data?.filter((card) => 
  card.generation === 1 && 
  card.pokedexId !== 0 && 
  !card.evolution?.next
);


  return {
    data: filteredData,
    ...rest,
  };
};
