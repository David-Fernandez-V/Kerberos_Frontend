import {
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import Feature from "../Feature";

import { useEffect, useState } from "react";
import { PasswordConfig } from "../../../types";

type Props = {
  onChange: (config: PasswordConfig) => void;
};

function PasswordOptions({ onChange }: Props) {
  //Valores por defecto
  const [config, setConfig] = useState<PasswordConfig>({
    length: 12,
    include_capital: true,
    include_lower: true,
    include_number: true,
    include_symbols: true,
    quantity_numbers: 5,
    quantity_symbols: 5,
  });

  //Estados para la coherencia de los inputs
  const [numCount, setNumCount] = useState(5);
  const [symbolCount, setSymbolCount] = useState(5);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  //Funciones para la coherencia de los inputs
  const handleNumChange = (input: number) => {
    const val = Math.max(0, input);
    setNumCount(val);
    setConfig({ ...config, quantity_numbers: val });

    if (val > 0 && !includeNumbers) {
      setIncludeNumbers(true);
    }
    if (val === 0 && includeNumbers) {
      setIncludeNumbers(false);
    }
  };

  const handleSymbolChange = (input: number) => {
    const val = Math.max(0, input);
    setSymbolCount(val);
    setConfig({ ...config, quantity_symbols: val });

    if (val > 0 && !includeSymbols) {
      setIncludeSymbols(true);
    }
    if (val === 0 && includeSymbols) {
      setIncludeSymbols(false);
    }
  };

  const handleNumChekbox = (checked: boolean) => {
    setIncludeNumbers(checked);
    setNumCount(checked ? 5 : 0);
    setConfig({ ...config, include_number: checked });
  };

  const handleSymbolCheckbox = (checked: boolean) => {
    setIncludeSymbols(checked);
    setSymbolCount(checked ? 5 : 0);
    setConfig({ ...config, include_symbols: checked });
  };

  //Efecto para actualizar con cada cambio
  useEffect(() => {
    onChange(config);
  }, [config]);

  return (
    <>
      {/*Longitud */}
      <Feature title="Longitud de la contraseña">
        <FormControl id="length" mb={5}>
          <NumberInput
            value={config.length}
            min={8}
            max={40}
            onChange={(_, v) => {
              if (v >= 12 && v <= 40) {
                setConfig({ ...config, length: v });
              }
            }}
          >
            <NumberInputField borderRightRadius={5} borderLeftRadius={5} />
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
            <Checkbox
              isChecked={config.include_capital}
              onChange={(e) =>
                setConfig({ ...config, include_capital: e.target.checked })
              }
            />
          </FormControl>
          {/*Minusculas*/}
          <FormControl id="lowe_case">
            <FormLabel>Minúsculas</FormLabel>
            <Checkbox
              isChecked={config.include_lower}
              onChange={(e) =>
                setConfig({ ...config, include_lower: e.target.checked })
              }
            />
          </FormControl>
          {/*Números*/}
          <FormControl id="digits">
            <FormLabel>Números</FormLabel>
            <Checkbox
              isChecked={includeNumbers}
              onChange={(e) => handleNumChekbox(e.target.checked)}
            />
          </FormControl>
          {/*Símbolos*/}
          <FormControl id="simbols">
            <FormLabel>Símbolos</FormLabel>
            <Checkbox
              isChecked={includeSymbols}
              onChange={(e) => handleSymbolCheckbox(e.target.checked)}
            />
          </FormControl>
        </HStack>

        <HStack mt={5}>
          {/*Cantidad de números*/}
          <FormControl id="digits_number" mb={5}>
            <FormLabel>Cantida de dígitos</FormLabel>
            <NumberInput
              value={numCount}
              onChange={(_, v) => handleNumChange(v)}
              //min={config.include_number ? 1 : 0}
              min={0}
            >
              <NumberInputField borderRightRadius={5} borderLeftRadius={5} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          {/*Cartidad de símbolos*/}
          <FormControl id="simbols_number" mb={5}>
            <FormLabel>Cantidad de símbolos</FormLabel>
            <NumberInput
              value={symbolCount}
              onChange={(_, v) => handleSymbolChange(v)}
              //min={config.include_number ? 1 : 0}
              min={0}
            >
              <NumberInputField borderRightRadius={5} borderLeftRadius={5} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </HStack>
      </Feature>
    </>
  );
}

export default PasswordOptions;
