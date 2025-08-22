import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { NoteItem } from "../../../types";
import useNoteDelete from "./useDeleteNote";
import useNotesStore from "../../../states/NotesStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  note: NoteItem | null;
  masterPwd?: string | null;
  onCloseDetail?: () => void;
};

function DeleteNoteConfirmation({
  isOpen,
  onClose,
  note,
  masterPwd,
  onCloseDetail,
}: Props) {
  const { mutate } = useNoteDelete();
  const { refreshNotes } = useNotesStore();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();

  const deleteNote = () => {
    if (note) {
      mutate(
        {
          note_id: note.id,
          master_password: masterPwd !== null ? masterPwd : "",
        },
        {
          onSuccess: async () => {
            await refreshNotes(-1);
            toast({
              title: "Completado",
              description: "La nota ha sido eliminada con éxito",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top-right",
            });
            onClose();
            onCloseDetail && onCloseDetail();
          },
          onError: (error) => {
            console.error("Error al borrar nota:", error);
          },
        }
      );
    } else {
      console.log("Sin nota por borrar");
    }
  };
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminación de Nota
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que quieres borrar esta nota?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant="ghost">
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={deleteNote} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteNoteConfirmation;
