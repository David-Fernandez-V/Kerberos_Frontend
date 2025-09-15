import { useEffect, useRef } from "react";

export function useDashboardWs(
  refreshNotes: (currentFolder: number) => void,
  refreshPasswords: (currentFolder: number) => void,
  refreshCards: (currentFolder: number) => void,
  currentFolder:number
) {
  const BASE_WS_URL = import.meta.env.VITE_WS_URL;
  const WS_URL = `${BASE_WS_URL}/dashboard`;

  const ws = useRef<WebSocket | null>(null);

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
