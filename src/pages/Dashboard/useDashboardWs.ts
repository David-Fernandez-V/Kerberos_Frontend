import { useEffect, useRef } from "react";
import usePasswordsStore from "../../states/PasswordsStore";
import useNotesStore from "../../states/NotesStore";
import useCardsStore from "../../states/CardsStore";
import useFoldersStore from "../../states/FoldersStore";

export function useDashboardWs(currentFolder: number) {
  const BASE_WS_URL = import.meta.env.VITE_WS_URL;
  const WS_URL = `${BASE_WS_URL}/dashboard`;

  const ws = useRef<WebSocket | null>(null);

  const {refreshPasswords} = usePasswordsStore();
  const { refreshNotes } = useNotesStore();
  const { refreshCards } = useCardsStore();
  //const { currentFolder } = useFoldersStore();

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("Conectado a WebSocket del dashboard");
      ws.current?.send("ping"); // opcional
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "note":
            refreshNotes(currentFolder);
            console.log(currentFolder)
            break;
          case "password":
            refreshPasswords(currentFolder);
            break;
          case "card":
            refreshCards(currentFolder);
            break;
          default:
            console.log("Evento desconocido:", message);
        }
      } catch (err) {
        console.error("Error parseando mensaje WS:", err);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket cerrado");
    };

    ws.current.onerror = (err) => {
      console.error("Error WebSocket:", err);
    };

    return () => {
      ws.current?.close();
    };
  }, [refreshNotes, refreshPasswords, refreshCards]);
}
