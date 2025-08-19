import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import Feature from "../Feature";
import { useState } from "react";

type Props = {};

function PassphraseOptions({}: Props) {
  const [languageOption, setLanguageOption] = useState<"spanish" | "english">(
    "spanish"
  );
  return (
    <>
      <Feature title="Opciones de la frase">
        <HStack mb={5}>
          {/*Número de palabras*/}
          <FormControl id="words_number">
            <FormLabel>Cantidad de palabras</FormLabel>
            <NumberInput>
              <NumberInputField borderRightRadius={5} borderLeftRadius={5} />
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
  );
}

export default PassphraseOptions;
