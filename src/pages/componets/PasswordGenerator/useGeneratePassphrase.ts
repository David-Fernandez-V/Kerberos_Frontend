import { useMutation } from "@tanstack/react-query";
import { generatePassphraseForm } from "../../../schemas/generatePassphraseSchema";

import axios from "axios";

interface GeneratedResponse {
  passphrase: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/passwords/generate_passphrase`;

export default function useGeneratePassphrase() {
  return useMutation<GeneratedResponse, unknown, generatePassphraseForm>({
    mutationFn: async (passphraseConfig) => {
      const response = await axios.post<GeneratedResponse>(url, passphraseConfig, {
        withCredentials: true,
      });

      return response.data;
    },
  });
}
