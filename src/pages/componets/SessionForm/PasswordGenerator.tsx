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
  Tooltip,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { FiCopy } from "react-icons/fi";
import { useCopy } from "../../../useCopy";
import { LuRefreshCcw } from "react-icons/lu";

import usePasswordStrength from "./usePasswordStrength";
import StrengthIndicator from "./StrengthIndicator";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function PasswordGenerator({ isOpen, onClose }: Props) {
  const { copy } = useCopy();

  const strengthMutation = usePasswordStrength();

  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isOpen) {
      // Limpia los campos del formulario
      setErrorMessage("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (passwordInput.trim().length === 0) {
      setPasswordStrength(undefined);
      return;
    }

    const timeout = setTimeout(() => {
      strengthMutation.mutate(passwordInput, {
        onSuccess: (data) => {
          setPasswordStrength(data.strength_level);
        },
      });
    }, 500);

    return () => clearTimeout(timeout); // limpiar el timeout si se vuelve a escribir antes de los 500ms
  }, [passwordInput]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700">Generador de Contraseñas</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <form id="mpwdForm" onSubmit={() => console.log("Submit")}>
            <FormControl id="pwd" autoFocus={true}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  //readOnly
                  variant="flushed"
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Tooltip label="Generar contraseña">
                    <IconButton
                      aria-label="Search database"
                      mr={2}
                      h="1.75rem"
                      onClick={() => console.log("Generar contraseña")}
                    >
                      <LuRefreshCcw />
                    </IconButton>
                  </Tooltip>
                  <Tooltip label="Generar contraseña">
                    <IconButton
                      aria-label="copy"
                      mr={2}
                      h="1.75rem"
                      onClick={() => copy(passwordInput)}
                    >
                      <FiCopy />
                    </IconButton>
                  </Tooltip>
                </InputRightElement>
              </InputGroup>
              {errorMessage && <Text color="red.600">{errorMessage}.</Text>}

              <StrengthIndicator
                isLoading={strengthMutation.isPending}
                strength={passwordStrength}
              />
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

export default PasswordGenerator;
