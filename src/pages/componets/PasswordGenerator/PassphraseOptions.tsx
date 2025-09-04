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

import { useEffect, useState } from "react";
import { PassphraseConfig } from "../../../types";

type Props = {
  onChange: (config: PassphraseConfig) => void;
};

function PassphraseOptions({ onChange }: Props) {
  const [languageOption, setLanguageOption] = useState<"spanish" | "english">(
    "spanish"
  );

  //Configuración predeterminada
  const [config, setConfig] = useState<PassphraseConfig>({
    words_number: 3,
    separator: "_",
    include_number: true,
    include_symbol: true,
    capitalize: true,
    english: true,
    spanish: true,
  });

  //Manejar cambios del separador
  const handleSeparatorChange = (input: string) => {
    const char = input.substring(0, 1);

    const symbolRegex = /^[^a-zA-Z0-9]$/;

    if (symbolRegex.test(char)) {
      setConfig({ ...config, separator: char });
    } else if (input.length === 0) {
      setConfig({ ...config, separator: "" });
    }
  };

  //Generar contraseña con cada cambio
  useEffect(() => {
    onChange(config);
  }, [config]);

  return (
    <>
      <Feature title="Opciones de la frase">
        <HStack mb={5}>
          {/*Número de palabras*/}
          <FormControl id="words_number">
            <FormLabel>Cantidad de palabras</FormLabel>
            <NumberInput
              value={config.words_number}
              onChange={(_, v) => {
                if (v !== config.words_number) {
                  setConfig({ ...config, words_number: v });
                }
              }}
              min={2}
              max={10}
            >
              <NumberInputField borderRightRadius={5} borderLeftRadius={5} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          {/*Separador*/}
          <FormControl>
            <FormLabel>Separador (solo símbolos)</FormLabel>
            <Input
              type="text"
              value={config.separator}
              onChange={(e) => handleSeparatorChange(e.target.value)}
            />
          </FormControl>
        </HStack>

        {/*Ingles/español*/}
        <Button
          size="sm"
          borderRightRadius={0}
          borderLeftRadius={3}
          variant={languageOption === "spanish" ? "solid" : "ghost2"}
          style={{ backgroundColor: "gray.100" }}
          onClick={() => {
            setLanguageOption("spanish");
            setConfig({ ...config, spanish: true, english: true });
          }}
        >
          Español
        </Button>
        <Button
          size="sm"
          borderLeftRadius={0}
          borderRightRadius={3}
          variant={languageOption === "english" ? "solid" : "ghost2"}
          onClick={() => {
            setLanguageOption("english");
            setConfig({ ...config, english: true, spanish: false });
          }}
        >
          Ingles
        </Button>
      </Feature>
      <br />

      <Feature title="Incluir">
        <HStack>
          {/*Usar mayúsculas*/}
          <FormControl id="capitalize">
            <FormLabel>Mayúsculas</FormLabel>
            <Checkbox
              isChecked={config.capitalize}
              onChange={(e) =>
                setConfig({ ...config, capitalize: e.target.checked })
              }
            />
          </FormControl>

          {/*Números*/}
          <FormControl id="digits">
            <FormLabel>Número</FormLabel>
            <Checkbox
              isChecked={config.include_number}
              onChange={(e) =>
                setConfig({ ...config, include_number: e.target.checked })
              }
            />
          </FormControl>

          {/*Símbolos*/}
          <FormControl id="simbols">
            <FormLabel>Símbolo</FormLabel>
            <Checkbox
              isChecked={config.include_symbol}
              onChange={(e) =>
                setConfig({ ...config, include_symbol: e.target.checked })
              }
            />
          </FormControl>
        </HStack>
      </Feature>
    </>
  );
}

export default PassphraseOptions;
