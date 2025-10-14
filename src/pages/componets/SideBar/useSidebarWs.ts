import { useEffect, useRef } from "react";
import useFoldersStore from "../../../states/FoldersStore";
import useSettings from "../../../states/SettingsStore";
import { useAuthStore } from "../../../states/AuthStore";

export function useSidebarWs() {
  const BASE_WS_URL = import.meta.env.VITE_WS_URL;
  const WS_URL = `${BASE_WS_URL}/sidebar`;

  const ws = useRef<WebSocket | null>(null);

  const {refreshFolders} = useFoldersStore();
  const {refreshUsername} = useSettings()

  const { logout } = useAuthStore();

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("Conectado a WebSocket de sidebar");
      ws.current?.send("ping"); // opcional
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "folder":
            refreshFolders();
            break;
          case "username":
            refreshUsername();
            break;
          case "logout":
            logout();
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
  }, [refreshFolders]);
}
