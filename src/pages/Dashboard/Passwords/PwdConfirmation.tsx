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
import { PasswordItem } from "../../../types";
import useDeletePassword from "./usePasswordDelete";
import usePasswordsStore from "../../../states/PasswordsStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  password: PasswordItem | null;
  masterPwd?: string | null;
  onCloseDetail?: () => void;
  onCloseMpwd?: () => void;
};

function PasswordConfirmation({
  isOpen,
  onClose,
  password,
  masterPwd,
  onCloseDetail,
  onCloseMpwd,
}: Props) {
  const { mutate } = useDeletePassword();
  const { refreshPasswords } = usePasswordsStore();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();

  const deleteCard = () => {
    if (password) {
      mutate(
        {
          password_id: password.id,
          master_password: masterPwd !== null ? masterPwd : "",
        },
        {
          onSuccess: async () => {
            await refreshPasswords(-1);
            toast({
              title: "Completado",
              description: "La sesión ha sido eliminada con éxito",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top-right",
            });
            onClose();
            onCloseDetail && onCloseDetail();
            onCloseMpwd && onCloseMpwd();
          },
          onError: (error) => {
            console.error("Error la sesión tarjeta:", error);
          },
        }
      );
    } else {
      console.log("Sin sesión por borrar");
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
              Eliminación de Sesión
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que quieres borrar esta sesión?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant="ghost">
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={deleteCard} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default PasswordConfirmation;
