"use client";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";

export default function Hero() {
  const imageUrl =
    "https://images.unsplash.com/photo-1611557514818-db7b5aeba9e9?q=80&w=2155&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <Flex
      background={`linear-gradient(
          rgb(0,0,0,0.7),
          rgb(0,0,0,0.7)
        ), 
        url(${imageUrl})`}
      w="full"
      h="full"
      backgroundSize={"cover"}
    >
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: "100px" }}
        >
          <Heading
            color={"white"}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Bienvenido a <br />
            <Text as={"span"} color={"purple.600"}>
              Kerberos
            </Text>
          </Heading>
          <Text
            color={"gray.300"}
            fontSize={{ base: "25", sm: "20", md: "20" }}
          >
            Un gestor de contraseñas para guardar, controlar y usar todas tus
            contraseñas de manera fácil y segura. <br /> <br />
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"purple"}
              bg={"purple.600"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "purple.500",
              }}
            >
              <RouterLink to={"/signUp"}>Empezar ahora</RouterLink>
            </Button>
            <Button
              colorScheme={"teal"}
              bg={"teal.500"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "teal.400",
              }}
            >
              <RouterLink to={"/logIn"}>Iniciar sesión</RouterLink>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
