import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/users/change-email`;

interface ChangeEmailRequest {
   token: string;
}

interface ChangeEmailResponse {
  message: string;
}

export default function useChangeEmail() {
  return useMutation<ChangeEmailResponse, Error, ChangeEmailRequest>({
    mutationFn: async (data: ChangeEmailRequest) => {
      const response = await axios.post<ChangeEmailResponse>(
        url,
        null,
        {
          params: { token: data.token },
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
}
