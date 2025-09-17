import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { NoteItem } from "../../../types";
import useNoteDelete from "./useDeleteNote";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  note: NoteItem | null;
  masterPwd?: string | null;
  onCloseDetail?: () => void;
  onCloseMpwd?: () => void;
};

function DeleteNoteConfirmation({
  isOpen,
  onClose,
  note,
  masterPwd,
  onCloseDetail,
  onCloseMpwd,
}: Props) {
  const { mutate } = useNoteDelete();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteNote = () => {
    if (note) {
      mutate(
        {
          note_id: note.id,
          master_password: masterPwd !== null ? masterPwd : "",
        },
        {
          onSuccess: async () => {
            onClose();
            onCloseDetail && onCloseDetail();
            onCloseMpwd && onCloseMpwd();
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
              ¿Estás seguro de que quieres borrar esta nota?
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
