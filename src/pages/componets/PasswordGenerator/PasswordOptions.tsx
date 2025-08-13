import {
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

type Props = {};

function PasswordOptions({}: Props) {
  return (
    <>
      {/*Longitud */}
      <FormControl id="length" mb={5}>
        <NumberInput>
          <NumberInputField borderRightRadius={5} borderLeftRadius={5} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      {/*Mayusculas*/}
      {/*Minusculas*/}
      {/*Números*/}
      {/*Símbolos*/}
      {/*Cantidad de números*/}
      <FormControl id="digits_number" mb={5}>
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
        <NumberInput>
          <NumberInputField borderRightRadius={5} borderLeftRadius={5} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  );
}

export default PasswordOptions;
