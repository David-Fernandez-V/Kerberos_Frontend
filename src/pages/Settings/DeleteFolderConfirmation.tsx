import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

import useDeleteFolder from "./useDeleteFolder";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  folder_id: number;
};

function DeleteFolderConfirmation({ isOpen, onClose, folder_id }: Props) {
  const { mutate } = useDeleteFolder();
  const cancelRef = useRef<HTMLButtonElement>(null);

  function handleDelete() {
    mutate({
      folder_id: folder_id,
    });
    onClose();
  }

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
              Eliminación de Carpeta
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que quieres borrar esta carpeta?
            </AlertDialogBody>

            <Alert status="info" color="gray.700">
              <AlertIcon />
              Los elementos asignados a esta carpeta no se eliminarán.
            </Alert>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant="ghost">
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteFolderConfirmation;
