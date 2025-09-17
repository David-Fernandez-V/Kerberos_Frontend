import { useEffect, useRef } from "react";
import usePasswordsStore from "../../states/PasswordsStore";
import useNotesStore from "../../states/NotesStore";
import useCardsStore from "../../states/CardsStore";

export function useDashboardWs(currentFolder: number) {
  const BASE_WS_URL = import.meta.env.VITE_WS_URL;
  const WS_URL = `${BASE_WS_URL}/dashboard`;

  const ws = useRef<WebSocket | null>(null);
  const folderRef = useRef(currentFolder);

  const {refreshPasswords} = usePasswordsStore();
  const { refreshNotes } = useNotesStore();
  const { refreshCards } = useCardsStore();

   // actualizar folderRef cada vez que cambie
  useEffect(() => {
    folderRef.current = currentFolder;
  }, [currentFolder]);

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
            refreshNotes(folderRef.current);
            break;
          case "password":
            refreshPasswords(folderRef.current);
            break;
          case "card":
            refreshCards(folderRef.current);
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
