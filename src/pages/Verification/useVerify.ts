import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function useVerify() {
  return useMutation({
    mutationFn: async (token: string) => {
      const res = await axios.get(`${API_URL}/authentication/verify`, {
        params: { token },
      });
      return res.data;
    },
  });
}
