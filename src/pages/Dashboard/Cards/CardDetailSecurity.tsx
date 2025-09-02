import {
  Text,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  ModalFooter,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { mpwdSchema, mpwdForm } from "../../../schemas/mpwdSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import useCardDetail from "./useCardDetail";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useCurrentCardDetail from "../../../states/CurrentCardDetail";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setMasterPwd: (pwd: string) => void;
  cardId: number | undefined;
};

function CardDetailSecurity({ isOpen, onClose, setMasterPwd, cardId }: Props) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<mpwdForm>({
    resolver: zodResolver(mpwdSchema),
  });

  const { mutate } = useCardDetail();
  const { setCurrentDetail } = useCurrentCardDetail();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      reset(); // Limpia los campos del formulario
      setShowPassword(false);
      setErrorMessage("");
    }
  }, [isOpen]);

  const onSubmit = (data: mpwdForm) => {
    if (cardId) {
      mutate(
        { card_id: cardId, master_password: data.mpwd },
        {
          onSuccess: (data) => {
            setCurrentDetail(data);
            const pws = (document.getElementById("mpwd") as HTMLInputElement)
              .value;
            setMasterPwd("string");
            toast({
              title: "Contraseña correcta",
              description: "Mostrando detalles",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "top-right",
            });
            onClose();
          },
          onError: (error) => {
            console.error("Error al obtener detalles:", error);
            setErrorMessage("Contraseña incorrecta");
          },
        }
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700">Confirmación de Seguridad</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <form id="mpwdForm" onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="mpwd">
              <FormLabel>Vuelva a introducir la contraseña maestra</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("mpwd")}
                  onFocus={() => setErrorMessage("")}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    aria-label="Search database"
                    mr={2}
                    variant="ghost"
                    h="1.75rem"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              {errors?.mpwd?.message && (
                <Text color={"red.600"}>{errors?.mpwd?.message}.</Text>
              )}
              {errorMessage && <Text color="red.600">{errorMessage}.</Text>}
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button form="mpwdForm" type="submit" mr={3}>
            Aceptar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CardDetailSecurity;
