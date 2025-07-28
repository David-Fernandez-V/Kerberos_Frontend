import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  Divider,
  Textarea,
  useToast,
  InputRightElement,
  InputGroup,
  IconButton,
  Box,
  Spinner,
  Flex,
  Select,
} from '@chakra-ui/react'

import { keyframes } from "@emotion/react";

import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"

import { passwordForm, passwordSchema } from '../../../schemas/passwordSchema'
import useCreatePassword from './useCreatePassword'
import Feature from '../Feature'
import axios from 'axios'
import usePasswordStrength from './usePasswordStrength'
import { useState, useEffect } from 'react'
import { strengthLabels, strengthColors } from '../../../types'
import usePasswordsStore from '../../../states/PasswordsStore';
import useFoldersStore from '../../../states/FoldersStore';

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";


type Props = {
  isOpen: boolean;
  onClose: () => void;
}

function SessionForm({isOpen, onClose}: Props) {
  const toast = useToast();
  const { folders } = useFoldersStore();

  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<passwordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const mutation = useCreatePassword();
  const strengthMutation = usePasswordStrength();
  const { refreshPasswords } = usePasswordsStore();
  const {currentFolder} = useFoldersStore()

  const [passwordStrength, setPasswordStrength] = useState<number | undefined>(undefined);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const shimmer = keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  `;

  useEffect(() => {
    if (!isOpen) {
      reset(); // Limpia los campos del formulario
      setPasswordStrength(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    if (passwordInput.trim().length === 0) {
      setPasswordStrength(undefined);
      return;
    }

    const timeout = setTimeout(() => {
      strengthMutation.mutate(passwordInput, {
        onSuccess: (data) => {
          setPasswordStrength(data.strength_level);
        }
      });
    }, 500);

    return () => clearTimeout(timeout); // limpiar el timeout si se vuelve a escribir antes de los 500ms
  }, [passwordInput]);

  const onSubmit = (data: passwordForm) => {
    mutation.mutate(data, {
      onSuccess: async (response) => {
        await refreshPasswords(currentFolder); // Actualiza estado global

        toast({
          title: "Nuevo inicio de sesión registrado",
          description: response.confirmation || "Los datos se guardaron correctamente.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        onClose();
      },
      onError: (error: any) => {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setError("service_name", {
            type: "manual",
            message: "Nombre no disponible.",
          });
        } else if (axios.isAxiosError(error) && error.response?.status === 401) {
          alert("Sesión caducada. Vuelve a iniciar sesión.");
        } else {
          console.error("Error al guardar contraseña:", error);
        }
      },
    });
  }

  return (
    <Modal  isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior='inside'>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader color="purple.700">Nuevo Inicio de Sesión</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <form id="passwordForm" onSubmit={handleSubmit(onSubmit)}>
            <Feature title='Detalles'>
              <FormControl id="name">
                <FormLabel>Nombre del elemento</FormLabel>
                <Input type="text" {...register("service_name")}/>
                {errors?.service_name?.message && (<Text color={"red.600"}>{errors?.service_name?.message}</Text>)}
              </FormControl>
            </Feature><br />
            <Feature title='Credenciales de inicio de sesión'>
              <FormControl id="user">
                <FormLabel>Usuario</FormLabel>
                <Input type="text" {...register("username")}/>
                {errors?.username?.message && (<Text color={"red.600"}>{errors?.username?.message}</Text>)}
              </FormControl><br />
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input 
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton aria-label="Search database" mr={2} variant='ghost' h="1.75rem" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </IconButton >
                    <IconButton aria-label="Search database" mr={10} h="1.75rem">
                      <LuRefreshCcw/>
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
                {errors?.password?.message && (<Text color={"red.600"}>{errors?.password?.message}</Text>)}

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
            </Feature><br />
            <Feature title='Autocompletar'>
              <FormControl id="webpage">
                <FormLabel>Página web (URL)</FormLabel>
                <Input type="text" {...register("web_page")}/>
                {errors?.web_page?.message && (<Text color={"red.600"}>{errors?.web_page?.message}</Text>)}
              </FormControl>
            </Feature><br />
            <Feature title='Opciones extras'>
              <FormControl id="folder">
                <FormLabel>Carpeta</FormLabel>
                <Select {...register("folder_id")}>
                  <option value="null">Sin carpeta</option>
                  {folders && folders.map((f) => 
                    <option key={f.id} value={f.id}>{f.name}</option>
                  )}
                </Select>
              </FormControl>
              <FormControl id="notes" mt={6}>
                <FormLabel>Notas</FormLabel>
                <Textarea placeholder='Anotaciones' {...register("notes")}/>
              </FormControl>
              <FormControl id="masterPassword">
                <Checkbox mt={6} {...register("ask_master_password")}>
                  <Text as="b">Pedir contraseña maestra</Text>
                </Checkbox>
              </FormControl>
            </Feature>
          </form>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button form="passwordForm" type="submit" mr={3} >Guardar</Button>
          <Button variant='ghost' onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SessionForm