'use client'

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
} from '@chakra-ui/react'

import { NavLink as RouterLink} from 'react-router-dom'
import Kerberos2 from '../../icons/Kerberos'

export default function RegistrationForm() {
  return (
    <Flex
      bg="purple.800"
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <RouterLink to={"/"}>
          <HStack align="center" spacing={4} color="gray.50">   
            <Text fontSize="450%" fontWeight="bold" mr={5}>
              Kerberos
            </Text>
            
            <Box boxSize="30%">
              <Kerberos2 width="100%" height="100%"/>
            </Box>
          </HStack>
        </RouterLink>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Crea tu cuenta</Heading><br />
            <Text fontSize={'lg'} color="gray.600">
              Genera y protege contraseñas de forma sencilla, rápida y segura.
            </Text>
          </Stack><br />

          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Correo elctrónico</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña maestra</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Text>Al continuar, aceptas los Términos de Servicio y la Política de Privacidad.</Text>
              <Button
                color={'white'}
              >
                Registrarse
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}