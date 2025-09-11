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
  ModalFooter,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { mpwdSchema, mpwdForm } from "../../../schemas/mpwdSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordConfirmation from "./PwdConfirmation";
import { PasswordItem } from "../../../types";
import useCheckMasterpwd from "../../../hooks/useCheckMasterpwd";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  password: PasswordItem | null;
};

function PwdDeleteSecurity({ isOpen, onClose, password }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<mpwdForm>({
    resolver: zodResolver(mpwdSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [Mpwd, setMpwd] = useState<string | null>(null);

  const ConfirmationAlert = useDisclosure();
  const { mutate } = useCheckMasterpwd();

  useEffect(() => {
    if (!isOpen) {
      reset(); // Limpia los campos del formulario
      setShowPassword(false);
      setErrorMessage("");
    }
  }, [isOpen]);

  const onSubmit = (formData: mpwdForm) => {
    if (password) {
      mutate(
        { master_password: formData.mpwd },
        {
          onSuccess: (data) => {
            setMpwd(formData.mpwd);
            console.log(data);
            ConfirmationAlert.onOpen();
            onClose();
          },
          onError: () => {
            setErrorMessage("Contraseña incorrecta");
          },
        }
      );
    } else {
      console.log("Sin sesióm seleccionada");
    }
  };

  return (
    <>
      <PasswordConfirmation
        isOpen={ConfirmationAlert.isOpen}
        onClose={ConfirmationAlert.onClose}
        password={password}
        masterPwd={Mpwd}
        onCloseDetail={onClose}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="purple.700">
            Confirmación de Seguridad
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <form
              id="mpwdForm"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <FormControl id="mpwd">
                <FormLabel>Vuelva a introducir la contraseña maestra</FormLabel>
                <InputGroup>
                  <Input
                    id="pwd"
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
    </>
  );
}

export default PwdDeleteSecurity;
