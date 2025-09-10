import {
  Text,
  Divider,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  InputGroup,
  IconButton,
  Tooltip,
  Container,
  HStack,
  Textarea,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

import { FiCopy } from "react-icons/fi";
import { useCopy } from "../../../useCopy";
import { LuRefreshCcw } from "react-icons/lu";

import usePasswordStrength from "../SessionForm/usePasswordStrength";
import StrengthIndicator from "../StrengthIndicator";
import useGeneratePassword from "./useGeneratePassword";
import useGeneratePassphrase from "./useGeneratePassphrase";
import GeneratedPassword from "../../../states/GeneratedPassword";
import PasswordOptions from "./PasswordOptions";
import PassphraseOptions from "./PassphraseOptions";

import { PasswordConfig, PassphraseConfig } from "../../../types/index";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function PasswordGenerator({ isOpen, onClose }: Props) {
  //Constantes
  const { copy } = useCopy();

  const strengthMutation = usePasswordStrength();
  const { mutate: passswordMutation, isError, error } = useGeneratePassword();
  const { mutate: passphraseMutation } = useGeneratePassphrase();
  const { setGeneratedPassword } = GeneratedPassword();

  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number | undefined>(
    undefined
  );
  const [passwordConfig, setPasswordConfig] = useState<PasswordConfig | null>(
    null
  );
  const [passphraseConfig, setPassphraseConfig] =
    useState<PassphraseConfig | null>(null);
  const [generationOption, setGenerationOption] = useState<
    "password" | "passphrase"
  >("password");

  const [errorMessage, setErrorMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //Funciones
  const handleGenerate = () => {
    if (generationOption === "password" && passwordConfig) {
      passswordMutation(passwordConfig, {
        onSuccess: (data) => {
          setPasswordInput(data.password);
        },
      });
    } else if (generationOption === "passphrase" && passphraseConfig) {
      passphraseMutation(passphraseConfig, {
        onSuccess: (data) => {
          setPasswordInput(data.passphrase);
        },
      });
    }
  };

  //Confirmar uso de contraseña
  const handleUsePassword = () => {
    setGeneratedPassword(passwordInput);
    onClose();
  };

  //Efectos
  useEffect(() => {
    //Resetar valores al cerrar
    if (!isOpen) {
      setPasswordInput("");
      setErrorMessage("");
      setGenerationOption("password");
    }
  }, [isOpen]);

  useEffect(() => {
    //Análisis de la contraseña
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

  useEffect(() => {
    //generar contraseña al recibir modificaciones
    if (generationOption === "password" && passwordConfig) {
      handleGenerate();
    }
  }, [passwordConfig]);

  useEffect(() => {
    //generar contraseña al recibir modificaciones
    if (generationOption == "passphrase" && passphraseConfig) {
      handleGenerate();
    }
  }, [passphraseConfig]);

  //Ajustar tamaño de contraseña
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // resetear altura
      textarea.style.height = `${textarea.scrollHeight}px`; // ajustar según contenido
    }
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
          {/*Botón para alternar opción */}
          <Container mb={5} mt={5} mx="auto" w="fit-content">
            <Button
              borderRightRadius={0}
              borderLeftRadius={10}
              variant={generationOption === "password" ? "solid" : "ghost2"}
              style={{ backgroundColor: "gray.100" }}
              onClick={() => setGenerationOption("password")}
            >
              Estandar
            </Button>
            <Button
              borderLeftRadius={0}
              borderRightRadius={10}
              variant={generationOption === "passphrase" ? "solid" : "ghost2"}
              onClick={() => setGenerationOption("passphrase")}
            >
              Frase contraseña
            </Button>
          </Container>

          {/*Display de la contraseña*/}
          <FormControl id="pwd" autoFocus={true} mb={8}>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <HStack width="100%">
                <Textarea
                  ref={textareaRef}
                  value={passwordInput}
                  readOnly
                  variant="flushed"
                  resize="none"
                  overflow="hidden"
                  rows={1}
                  fontFamily="monospace"
                />
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
              </HStack>
            </InputGroup>
            <StrengthIndicator
              isLoading={strengthMutation.isPending}
              strength={passwordStrength}
            />
          </FormControl>
          {errorMessage && <Text color="red.600">{errorMessage}.</Text>}
          {isError && <p style={{ color: "red" }}>Error: {String(error)}</p>}

          {/*Formulario para las opciones*/}
          <form id="optionsForm" onSubmit={() => console.log("Submit")}>
            {generationOption === "password" ? (
              /*Opción de password*/
              <PasswordOptions onChange={setPasswordConfig} />
            ) : (
              /*Opcion de passphrase*/
              <PassphraseOptions onChange={setPassphraseConfig} />
            )}
          </form>
        </ModalBody>

        {/*Pie del modal */}
        <ModalFooter>
          <Button
            form="optionsForm"
            onClick={handleUsePassword}
            /*type="submit"*/ mr={3}
          >
            Usar contraseña
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
