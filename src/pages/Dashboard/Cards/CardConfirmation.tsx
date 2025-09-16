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
import { CardItem } from "../../../types";
import useDeleteCard from "./useDeleteCard";
import useCardsStore from "../../../states/CardsStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  card: CardItem | null;
  masterPwd?: string | null;
  onCloseDetail?: () => void;
  onCloseMpwd?: () => void;
};

function CardConfirmation({
  isOpen,
  onClose,
  card,
  masterPwd,
  onCloseDetail,
  onCloseMpwd,
}: Props) {
  const { mutate } = useDeleteCard();
  const { refreshCards } = useCardsStore();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();

  const deleteCard = () => {
    if (card) {
      mutate(
        {
          card_id: card.id,
          master_password: masterPwd !== null ? masterPwd : "",
        },
        {
          onSuccess: async () => {
            onClose();
            onCloseDetail && onCloseDetail();
            onCloseMpwd && onCloseMpwd();
          },
          onError: (error) => {
            console.error("Error al borrar tarjeta:", error);
          },
        }
      );
    } else {
      console.log("Sin tarjeta por borrar");
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
              Eliminación de Tarjeta
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que quieres borrar esta tarjeta?
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

export default CardConfirmation;
