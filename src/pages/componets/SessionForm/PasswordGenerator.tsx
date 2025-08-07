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
    Box,
    Flex,
    Spinner,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { mpwdSchema, mpwdForm } from "../../../schemas/mpwdSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import usePasswordDetail from "../../Dashboard/Passwords/usePasswordDetail";
import { FiCopy } from "react-icons/fi";
import { useCopy } from "../../../useCopy";
import { LuRefreshCcw } from "react-icons/lu";

import { strengthLabels, strengthColors } from '../../../types'
import usePasswordStrength from "./usePasswordStrength";
import { keyframes } from "@emotion/react";


type Props = {
  isOpen: boolean;
  onClose: () => void;
}

function PasswordGenerator({isOpen, onClose}: Props) {
    const shimmer = keyframes`
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    `;



    const {copy} = useCopy()
  
    const { register, handleSubmit, formState: { errors }, reset } = useForm<mpwdForm>({
        resolver: zodResolver(mpwdSchema),
    });

    const { mutate } = usePasswordDetail();
    const strengthMutation = usePasswordStrength();

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordStrength, setPasswordStrength] = useState<number | undefined>(undefined);
  
    useEffect(() => {
      if (!isOpen) {
        reset(); // Limpia los campos del formulario
        setShowPassword(false)
        setErrorMessage("")
      }
    }, [isOpen]);
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior='inside'>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader color="purple.700">Generador de Contraseñas</ModalHeader>
                <ModalCloseButton/>
                <Divider/>
                <ModalBody>
                    <form id="mpwdForm" onSubmit={() => console.log("Submit")}>
                        <FormControl id="pwd" autoFocus={true}>
                            <FormLabel>Contraseña</FormLabel>
                            <InputGroup>
                                <Input
                                    type="text"
                                    readOnly
                                    variant="flushed"
                                    {...register("mpwd")}
                                />
                                <InputRightElement width="4.5rem">
                                    <Tooltip label="Generar contraseña">
                                        <IconButton aria-label="Search database" mr={2} h="1.75rem" onClick={() => console.log("Generar contraseña")}>
                                            <LuRefreshCcw/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip label="Generar contraseña">
                                        <IconButton aria-label="copy" mr={2} h="1.75rem" onClick={() => copy("abc")}>
                                            <FiCopy/>
                                        </IconButton >
                                    </Tooltip>
                                </InputRightElement>
                            </InputGroup>
                            {errors?.mpwd?.message && (<Text color={"red.600"}>{errors?.mpwd?.message}.</Text>)}
                            {errorMessage && (<Text color="red.600">{errorMessage}.</Text>)}

                            <Box  bg="gray.300" mt={2} w="100%" borderRadius="md" overflow="hidden" h="1.5rem">
                                {strengthMutation.isPending ? (
                                    //Estado: Cargando
                                    <Flex
                                    w="100%"
                                    h="100%"
                                    align="center"
                                    justify="center"
                                    bg="gray.300"
                                    backgroundImage="linear-gradient(90deg, gray.400, gray.300, gray.400)"
                                    backgroundSize="200% 100%"
                                    animation={`${shimmer} 1.5s linear infinite`}
                                    >
                                    <Spinner size="sm" color="gray.600" thickness="2px" />
                                    </Flex>
                                ) : passwordStrength !== undefined ? (
                                    //Estado: Evaluado
                                    <Box
                                    w={`${(passwordStrength + 1) * 20}%`}
                                    h="100%"
                                    bg={strengthColors[passwordStrength]}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    transition="width 0.3s ease"
                                    >
                                    <Text
                                        fontSize="sm"
                                        color="gray.50"
                                        fontWeight="bold"
                                        whiteSpace="nowrap"
                                    >
                                        {strengthLabels[passwordStrength]}
                                    </Text>
                                    </Box>
                                ) : (
                                    //Estado: Apagado (sin contraseña)
                                    <Box
                                    w="100%"
                                    h="100%"
                                    bg="gray.300"
                                    />
                                )}
                            </Box>

                        </FormControl>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button form="mpwdForm" type="submit" mr={3}>Aceptar</Button>
                    <Button variant='ghost' onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PasswordGenerator