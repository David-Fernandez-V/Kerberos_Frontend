"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
  Divider,
} from "@chakra-ui/react";

import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import Kerberos2 from "../../icons/Kerberos";
import { useEffect, useState } from "react";
import usePasswordStrength from "../componets/SessionForm/usePasswordStrength";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import StrengthIndicator from "../componets/StrengthIndicator";
import { useForm } from "react-hook-form";
import {
  registrationForm,
  registrationSchema,
} from "../../schemas/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "./useRegister";

export default function RegistrationForm() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number | undefined>(
    undefined
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const strengthMutation = usePasswordStrength();

  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<registrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  //Función para registrar
  const onSubmit = (data: registrationForm) => {
    setErrorMessage("");
    mutate(data, {
      onSuccess: async (response) => {
        console.log(response.data);
        setIsRegistered(true);
      },

      onError: (error: any) => {
        if (error.response?.status === 400) {
          setErrorMessage("El correo ya está registrado");
        } else {
          setErrorMessage("Ocurrió un error. Intenta de nuevo.");
        }
      },
    });
  };

  //Análizar contraseña
  useEffect(() => {
    if (passwordInput.trim().length === 0) {
      setPasswordStrength(undefined);
      return;
    }

    const timeout = setTimeout(() => {
      strengthMutation.mutate(passwordInput, {
        onSuccess: (data) => {
          setPasswordStrength(data.strength_level);
        },
      });
    }, 500);

    return () => clearTimeout(timeout); // limpiar el timeout si se vuelve a escribir antes de los 500ms
  }, [passwordInput]);

  //Limpiar campos
  useEffect(() => {
    reset();
    setPasswordStrength(undefined);
  }, []);

  return (
    <Flex bg="purple.800" minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        {/*Logo*/}
        <RouterLink to={"/"}>
          <HStack align="center" spacing={4} color="gray.50">
            <Text fontSize="450%" fontWeight="bold" mr={5}>
              Kerberos
            </Text>

            <Box boxSize="30%">
              <Kerberos2 width="100%" height="100%" />
            </Box>
          </HStack>
        </RouterLink>

        {/*Contenedor*/}
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {!isRegistered ? (
            <>
              {/*Formulario*/}
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Crea tu cuenta</Heading>
                <br />
                <Text fontSize={"lg"} color="gray.600" align="center">
                  Genera y protege contraseñas de forma sencilla, rápida y
                  segura.
                </Text>
              </Stack>
              <br />
              <form id="RegistrationForm" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  {/*Correo electrónico*/}
                  <FormControl id="email">
                    <FormLabel>Correo elctrónico</FormLabel>
                    <Input type="text" {...register("email")} />
                    {errors?.email?.message && (
                      <Text color={"red.600"}>{errors?.email?.message}</Text>
                    )}
                  </FormControl>

                  {/*Contraseña */}
                  <FormControl id="password">
                    <FormLabel>Contraseña maestra</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                        }}
                      />
                      <InputRightElement width="4.5rem">
                        <IconButton
                          aria-label="Cambiar visibilidad"
                          mr={2}
                          variant="ghost"
                          h="1.75rem"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                      </InputRightElement>
                    </InputGroup>
                    {errors?.password?.message && (
                      <Text color={"red.600"}>{errors?.password?.message}</Text>
                    )}
                    <StrengthIndicator
                      isLoading={strengthMutation.isPending}
                      strength={passwordStrength}
                    />
                  </FormControl>

                  {/* */}
                  <Stack spacing={10}>
                    <Text fontSize={"lg"} color="gray.600" align="center">
                      La Contraseña Maestra es la única que deberás recordar.
                      Asegurate de que llegue al mayor nivel de seguridad.
                    </Text>

                    {!isPending ? (
                      <Button type="submit" color={"white"}>
                        Registrarse
                      </Button>
                    ) : (
                      <Box
                        color="purple.700"
                        display="flex"
                        justifyContent="center"
                      >
                        <Spinner size="md" />
                      </Box>
                    )}
                    {errorMessage && (
                      <Text color="red.600">{errorMessage}</Text>
                    )}
                  </Stack>
                </Stack>
              </form>
            </>
          ) : (
            <>
              {/*Mensaje de confirmación*/}
              <Text>Registro exitoso</Text>
            </>
          )}
          <Divider mt={3} mb={3} />
          <Stack>
            <Text fontSize={"md"} color="gray.600" align="center">
              ¿Ya tienes una cuenta?
            </Text>
            <Box display="flex" justifyContent="center">
              <Button
                size="md"
                width="60%"
                variant="ghost"
                _hover={{ bg: "gray.300" }}
                onClick={() => navigate("/LogIn")}
              >
                Iniciar sesión
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
