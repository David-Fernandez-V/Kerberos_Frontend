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

import usePasswordStrength from "../SessionForm/usePasswordStrength";
import StrengthIndicator from "../StrengthIndicator";
import useGeneratePassword from "./useGeneratePassword";
import { generatePswForm } from "../../../schemas/generatePswSchema";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function PasswordGenerator({ isOpen, onClose }: Props) {
  //Constantes
  const { copy } = useCopy();

  const strengthMutation = usePasswordStrength();
  const { mutate, isError, data, error } = useGeneratePassword();

  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState("");

  //Funciones
  const handleGenerate = () => {
    const config: generatePswForm = {
      length: 12,
      include_capital: true,
      include_lower: true,
      include_number: true,
      include_symbols: true,
      quantity_numbers: 3,
      quantity_symbols: 2,
    };

    mutate(config, {
      onSuccess: (data) => {
        setPasswordInput(data.password);
      },
    });
  };

  //Efectos
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
        onSuccess: ({ strength_level }) => {
          setPasswordStrength(strength_level);
        },
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [passwordInput]);

  //Componente
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
                  readOnly
                  value={passwordInput}
                  variant="flushed"
                />
                {isError && (
                  <p style={{ color: "red" }}>Error: {String(error)}</p>
                )}
                <InputRightElement width="4.5rem">
                  <Tooltip label="Generar contraseña">
                    <IconButton
                      aria-label="Generar contraseña"
                      mr={2}
                      h="1.75rem"
                      onClick={handleGenerate}
                    >
                      <LuRefreshCcw />
                    </IconButton>
                  </Tooltip>
                  <Tooltip label="Copiar contraseña">
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
