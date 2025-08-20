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
    length: 16,
    include_capital: true,
    include_lower: true,
    include_number: true,
    include_symbols: true,
  });

  //Efecto para actualizar con cada cambio
  useEffect(() => {
    console.log(config);
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
            <FormLabel>Dígitos</FormLabel>
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
      </Feature>
    </>
  );
}

export default PasswordOptions;
