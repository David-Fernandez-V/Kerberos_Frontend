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
  const [config, setConfig] = useState<PasswordConfig>({
    length: 12,
    include_capital: true,
    include_lower: true,
    include_number: true,
    include_symbols: true,
    quantity_numbers: 3,
    quantity_symbols: 2,
  });

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
            onChange={(_, v) => setConfig({ ...config, length: v })}
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
              isChecked={config.include_number}
              onChange={(e) =>
                setConfig({ ...config, include_number: e.target.checked })
              }
            />
          </FormControl>
          {/*Símbolos*/}
          <FormControl id="simbols">
            <FormLabel>Símbolos</FormLabel>
            <Checkbox
              isChecked={config.include_symbols}
              onChange={(e) =>
                setConfig({ ...config, include_symbols: e.target.checked })
              }
            />
          </FormControl>
        </HStack>

        <HStack mt={5}>
          {/*Cantidad de números*/}
          <FormControl id="digits_number" mb={5}>
            <FormLabel>Cantida de dígitos</FormLabel>
            <NumberInput
              value={config.quantity_numbers}
              onChange={(_, v) => setConfig({ ...config, quantity_numbers: v })}
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
              value={config.quantity_symbols}
              onChange={(_, v) => setConfig({ ...config, quantity_symbols: v })}
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
