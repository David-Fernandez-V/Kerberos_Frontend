'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  Box,
} from '@chakra-ui/react'

import { NavLink as RouterLink} from 'react-router-dom'

import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { loginForm, loginSchema } from '../../schemas/loginSchema'
import useLogin from './useLogin'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../states/AuthStore'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import KerberosTitle from '../componets/KerberosTitle'

export default function LoginForm() {
  const EMAIL_KEY = "rememberedEmail";
  const EMAIL_EXP_KEY = "rememberedEmailExpiration";
  const EXPIRATION_DAYS = 7;

  const {login: loginFunction} = useAuthStore()

  const { register, handleSubmit, setValue, formState: { errors }} = useForm<loginForm>({
    resolver: zodResolver(loginSchema),
  })
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const navigate = useNavigate();

  const login = useLogin(() => {
    loginFunction();
    navigate("/dashboard");
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem(EMAIL_KEY);
    const savedExp = localStorage.getItem(EMAIL_EXP_KEY);

    if (savedEmail && savedExp) {
      const now = new Date();
      const expiration = new Date(savedExp);

      if (now < expiration) {
        setValue("email", savedEmail);
        setRememberEmail(true);
      } else {
        // Expirado: limpiar
        localStorage.removeItem(EMAIL_KEY);
        localStorage.removeItem(EMAIL_EXP_KEY);
      }
    }
  }, [setValue]);

  const onSubmit = (data: loginForm) => {
    //Actuaizar fecha de expiración
    if (rememberEmail) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + EXPIRATION_DAYS);

      localStorage.setItem(EMAIL_KEY, data.email);
      localStorage.setItem(EMAIL_EXP_KEY, expirationDate.toISOString());
    } else {
      localStorage.removeItem(EMAIL_KEY);
      localStorage.removeItem(EMAIL_EXP_KEY);
    }

    //Lógica del login
    setErrorMessage("");
    login.mutate(data, {
      onError: (error: any) => {
        if (error.response?.status === 401) {
          setErrorMessage("Credenciales incorrectas.");
        } else {
          setErrorMessage("Ocurrió un error. Intenta de nuevo.");
        }
      },
    });
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <KerberosTitle/>
          <Heading fontSize={'4xl'} mt={140} mb="5%">Inicio  de sesión</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email">
              <FormLabel fontSize="xl">Correo electrónico</FormLabel>
              <Input type="text" {...register("email")}/>
              {errors?.email?.message && (<Text color={"red.600"}>{errors?.email?.message}</Text>)}
            </FormControl>
            <br /><FormControl id="password">
              <FormLabel fontSize="xl">Contraseña maestra</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}

                  {...register("password")}
                />
                <InputRightElement width="4.5rem">
                  <IconButton aria-label="Search database" mr={2} variant='ghost' h="1.75rem" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                  </IconButton >
                </InputRightElement>
              </InputGroup>
              {errors?.password?.message && (<Text color={"red.600"}>{errors?.password?.message}</Text>)}
            </FormControl>
            <br /><Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox
                  isChecked={rememberEmail}
                  onChange={(e) => setRememberEmail(e.target.checked)}
                >
                  Recordar correo electrónico
                </Checkbox>
                <Text color={'blue.500'}>¿Olvidaste tu contraseña?</Text>
              </Stack>
              <Button type="submit" variant={'solid'}>
                Iniciar Sesión
              </Button>
              {errorMessage && (
                <Text color="red.500">{errorMessage}</Text>
              )}
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1} bg="purple.700" align={'center'} justify={'center'}>

        <Box p={5} pr="7%" pl="7%" color="gray.50" alignContent="center">
          
            <Heading fontSize='3xl' mb={6}>¿Eres nuevo?</Heading>
            <Text fontSize="2xl" mb="7%">
              Registrate ahora y empeiza a proteger tus contraseñas.
            </Text>
            
            <Image
              src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              
            />
            
            <Text fontSize="2xl" mt="7%" mb="7%">
              Accede facilmente a tus contraseñas, tarjetas, y crea notas privadas de forma rápida y segura. 
            </Text>
            <Button size="lg" bg="gray.200" color="purple.700" _hover={{bg:"purple.600", color: "gray.50"}}>
              <RouterLink to={"/signUp"}>Registrate Aquí</RouterLink>
            </Button>
        </Box>
      </Flex>
    </Stack>
  )
}