const BASE_URL = "https://tyradex.vercel.app/api/v1";

export class ApiClient {
  static useGetAllCards = async () => {
    const response = await fetch(`${BASE_URL}/pokemon`).then((res) => res.json());
    return response;
  };
  static useGetCardById = async (id: number) => {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`).then((res) => res.json());
    return response; 
  };
}