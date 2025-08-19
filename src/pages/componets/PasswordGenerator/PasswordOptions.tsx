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

type Props = {};

function PasswordOptions({}: Props) {
  return (
    <>
      {/*Longitud */}
      <Feature title="Longitud de la contraseña">
        <FormControl id="length" mb={5}>
          <NumberInput>
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
            <NumberInput>
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
