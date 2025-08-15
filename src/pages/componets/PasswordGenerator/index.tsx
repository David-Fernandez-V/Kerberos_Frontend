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
  Container,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Checkbox,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { FiCopy } from "react-icons/fi";
import { useCopy } from "../../../useCopy";
import { LuRefreshCcw } from "react-icons/lu";

import usePasswordStrength from "../SessionForm/usePasswordStrength";
import StrengthIndicator from "../StrengthIndicator";
import useGeneratePassword from "./useGeneratePassword";
import { generatePswForm } from "../../../schemas/generatePswSchema";
import Feature from "../Feature";
import useGeneratePassphrase from "./useGeneratePassphrase";
import { generatePassphraseForm } from "../../../schemas/generatePassphraseSchema";

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

  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number | undefined>(
    undefined
  );
  const [generationOption, setGenerationOption] = useState<
    "password" | "passphrase"
  >("password");
  const [languageOption, setLanguageOption] = useState<"spanish" | "english">(
    "spanish"
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

    const config2: generatePassphraseForm = {
      words_number: 12,
      separator: "_",
      include_number: true,
      include_symbol: true,
      capitalize: true,
      english: true,
      spanish: true,
    };

    if (generationOption == "password") {
      passswordMutation(config, {
        onSuccess: (data) => {
          setPasswordInput(data.password);
        },
      });
    } else {
      passphraseMutation(config2, {
        onSuccess: (data) => {
          setPasswordInput(data.passphrase);
        },
      });
    }
  };

  //Efectos
  useEffect(() => {
    if (!isOpen) {
      // Limpia los campos del formulario
      setPasswordInput("");
      setErrorMessage("");
      setGenerationOption("password");
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
          {/*Botón para alternar opción */}
          <Container mb={10} mt={5} mx="auto" w="fit-content">
            <Button
              borderRightRadius={0}
              borderLeftRadius={10}
              variant={generationOption === "password" ? "solid" : "ghost2"}
              style={{ backgroundColor: "gray.100" }}
              onClick={() => setGenerationOption("password")}
            >
              Contraseña estandar
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

          {/*Formulario para las opciones*/}
          <form id="optionsForm" onSubmit={() => console.log("Submit")}>
            {generationOption === "password" ? (
              /*Opción de password*/
              <>
                {/*Longitud */}
                <Feature title="Longitud de la contraseña">
                  <FormControl id="length" mb={5}>
                    <NumberInput>
                      <NumberInputField
                        borderRightRadius={5}
                        borderLeftRadius={5}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Feature>
                <br />

                <Feature title="Incluir">
                  <HStack>
                    {/*Mayusculas*/}
                    <FormControl id="capital_case">
                      <FormLabel>Mayúsculas</FormLabel>
                      <Checkbox></Checkbox>
                    </FormControl>
                    {/*Minusculas*/}
                    <FormControl id="lowe_case">
                      <FormLabel>Minúsculas</FormLabel>
                      <Checkbox></Checkbox>
                    </FormControl>
                    {/*Números*/}
                    <FormControl id="digits">
                      <FormLabel>Números</FormLabel>
                      <Checkbox></Checkbox>
                    </FormControl>
                    {/*Símbolos*/}
                    <FormControl id="simbols">
                      <FormLabel>Símbolos</FormLabel>
                      <Checkbox></Checkbox>
                    </FormControl>
                  </HStack>

                  <HStack mt={5}>
                    {/*Cantidad de números*/}
                    <FormControl id="digits_number" mb={5}>
                      <FormLabel>Cantida de dígitos</FormLabel>
                      <NumberInput>
                        <NumberInputField
                          borderRightRadius={5}
                          borderLeftRadius={5}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    {/*Cartidad de símbolos*/}

                    <FormControl id="simbols_number" mb={5}>
                      <FormLabel>Cantidad de símbolos</FormLabel>
                      <NumberInput>
                        <NumberInputField
                          borderRightRadius={5}
                          borderLeftRadius={5}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </HStack>
                </Feature>
              </>
            ) : (
              /*Opcion de passphrase*/
              <>
                <Feature title="Opciones de la frase">
                  <HStack mb={5}>
                    {/*Número de palabras*/}
                    <FormControl id="words_number">
                      <FormLabel>Cantidad de palabras</FormLabel>
                      <NumberInput>
                        <NumberInputField
                          borderRightRadius={5}
                          borderLeftRadius={5}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    {/*Separador*/}
                    <FormControl>
                      <FormLabel>Separador</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </HStack>

                  {/*Ingles/español*/}
                  <Button
                    size="sm"
                    borderRightRadius={0}
                    borderLeftRadius={3}
                    variant={languageOption === "spanish" ? "solid" : "ghost2"}
                    style={{ backgroundColor: "gray.100" }}
                    onClick={() => setLanguageOption("spanish")}
                  >
                    Español
                  </Button>
                  <Button
                    size="sm"
                    borderLeftRadius={0}
                    borderRightRadius={3}
                    variant={languageOption === "english" ? "solid" : "ghost2"}
                    onClick={() => setLanguageOption("english")}
                  >
                    Ingles
                  </Button>
                </Feature>
                <br />

                <Feature title="Incluir">
                  <HStack>
                    {/*Números*/}
                    <FormControl id="digits">
                      <FormLabel>Números</FormLabel>
                      <Checkbox></Checkbox>
                    </FormControl>

                    {/*Símbolos*/}
                    <FormControl id="simbols">
                      <FormLabel>Símbolos</FormLabel>
                      <Checkbox></Checkbox>
                    </FormControl>

                    {/*Usar mayúsculas*/}
                    <FormControl id="capitalize">
                      <FormLabel>Mayúsculas</FormLabel>
                      <Checkbox></Checkbox>
                    </FormControl>
                  </HStack>
                </Feature>
              </>
            )}
          </form>
        </ModalBody>

        {/*Pie del modal */}
        <ModalFooter>
          <Button form="optionsForm" /*type="submit"*/ mr={3}>
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
