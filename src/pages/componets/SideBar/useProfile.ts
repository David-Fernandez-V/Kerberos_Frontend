import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../types";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/users/me`;

async function fetchProfile(): Promise<User> {
  const response = await axios.get<User>(URL, {
    withCredentials: true,
  });
  return response.data;
}

export default function useProfile() {
  return useQuery({
    queryKey: ["profile"], // clave única para el cache
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5, // cache válido por 5 min
    retry: false, // evita reintentos infinitos si no hay sesión
  });
}
