import { useQuery } from "@tanstack/react-query";
import { Card } from "./useGetAllCards";
import { ApiClient } from "../api";

export const useGetCardById = (id: number) => {
  return useQuery<Card>({
    queryKey: ["cards", id],
    queryFn: () => ApiClient.useGetCardById(id),
  });
};