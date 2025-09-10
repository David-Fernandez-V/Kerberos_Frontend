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

  //Evitar desmarcar todas las cajas
  const handleCheckboxChange =
    (field: keyof PasswordConfig) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.checked;

      //no permitir desmarcar la única caja
      if (
        !newValue && // intenta desmarcar
        Object.entries(config).filter(
          ([key, val]) =>
            [
              "include_capital",
              "include_lower",
              "include_number",
              "include_symbols",
            ].includes(key) && val === true
        ).length === 1
      ) {
        return; // ignorar el cambio
      }

      setConfig({ ...config, [field]: newValue });
    };

  //Efecto para actualizar con cada cambio
  useEffect(() => {
    //console.log(config);
    onChange(config);
  }, [config, onChange]);

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
              if (v !== config.length) {
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
            <FormLabel>A-Z</FormLabel>
            <Checkbox
              isChecked={config.include_capital}
              onChange={handleCheckboxChange("include_capital")}
            />
          </FormControl>
          {/*Minusculas*/}
          <FormControl id="lowe_case">
            <FormLabel>a-z</FormLabel>
            <Checkbox
              isChecked={config.include_lower}
              onChange={handleCheckboxChange("include_lower")}
            />
          </FormControl>
          {/*Números*/}
          <FormControl id="digits">
            <FormLabel>0-9</FormLabel>
            <Checkbox
              isChecked={config.include_number}
              onChange={handleCheckboxChange("include_number")}
            />
          </FormControl>
          {/*Símbolos*/}
          <FormControl id="simbols">
            <FormLabel>Símbolos</FormLabel>
            <Checkbox
              isChecked={config.include_symbols}
              onChange={handleCheckboxChange("include_symbols")}
            />
          </FormControl>
        </HStack>
      </Feature>
    </>
  );
}

export default PasswordOptions;
