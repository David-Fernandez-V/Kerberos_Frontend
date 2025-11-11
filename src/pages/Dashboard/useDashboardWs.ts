import { useEffect, useRef } from "react";
import usePasswordsStore from "../../states/PasswordsStore";
import useNotesStore from "../../states/NotesStore";
import useCardsStore from "../../states/CardsStore";
import { useToast } from "@chakra-ui/react";

export function useDashboardWs(currentFolder: number) {
  const BASE_WS_URL = import.meta.env.VITE_WS_URL;
  const WS_URL = `${BASE_WS_URL}/dashboard`;

  const ws = useRef<WebSocket | null>(null);
  const folderRef = useRef(currentFolder);

  const {refreshPasswords} = usePasswordsStore();
  const { refreshNotes } = useNotesStore();
  const { refreshCards } = useCardsStore();

  const toast = useToast()

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
          case "create_note":
            refreshNotes(folderRef.current);
            toast({
              title: "Nueva nota creada",
              description:"Los datos se guardaron correctamente.",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "bottom-right",
            });
            break;
          case "modify_note":
            refreshNotes(folderRef.current);
            toast({
              title: "Nota modificada",
              description: "Los datos se modificaron correctamente.",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "bottom-right",
            });
            break;
          case "delete_note":
            refreshNotes(folderRef.current);
            toast({
              title: "Eliminado",
              description: "La nota ha sido eliminada con éxito",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "bottom-right",
            });
            break;
          case "create_password":
            refreshPasswords(folderRef.current);
            toast({
              title: "Nueva sesión creada",
              description: "Los datos se guardaron correctamente.",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "bottom-right",
            });
            break;
          case "modify_password":
            refreshPasswords(folderRef.current);
            toast({
              title: "Sesión modificada",
              description:"Los datos se modificaron correctamente.",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "bottom-right",
            });
            break;
          case "delete_password":
            refreshPasswords(folderRef.current);
            toast({
              title: "Eliminado",
              description: "La sesión ha sido eliminada con éxito",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "bottom-right",
            });
            break;
          case "create_card":
            refreshCards(folderRef.current);
            break;
          case "modify_card":
            refreshCards(folderRef.current);
            break;
          case "delete_card":
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
