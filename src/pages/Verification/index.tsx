import {
  Heading,
  Text,
  Button,
  Stack,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Kerberos from "../../icons/Kerberos";
import useVerify from "./useVerify";
import { useState } from "react";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [isVerify, setIsVerify] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending, isError } = useVerify();

  //Función para verificar
  const handleVerify = () => {
    if (token) {
      mutate(token, {
        onSuccess: () => {
          console.log("Exito");
          setIsVerify(true);
        },
      });
    } else {
      setError("Sin token de verificación.");
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      {/* Parte superior (35%) */}
      <Flex flex="0.35" align="center" justify="center">
        <Stack textAlign="center" spacing={6}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight="110%"
          >
            Gracias por registrarte en <br />
            <Text as="span" color="purple.700">
              Kerberos
            </Text>
          </Heading>
          <Box color="purple.700" display="flex" justifyContent="center">
            <Kerberos
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "300px",
              }}
            />
          </Box>
        </Stack>
      </Flex>

      {/* Parte inferior (65%) */}
      <Flex
        flex="0.65"
        bg="purple.700"
        color="white"
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        px={6}
      >
        {!isVerify ? (
          <>
            <Text fontSize="2xl" mb={6}>
              ¡Ultimo Paso!
            </Text>
            <Text fontSize="2xl" mb={6}>
              Termina la verificación de correo electrónico para empezar a usar
              Kerberos.
            </Text>
            <br />

            {!isPending ? (
              <Button
                size="lg"
                color="purple.700"
                bg="gray.100"
                onClick={handleVerify}
              >
                Verificar
              </Button>
            ) : (
              <Spinner size="md" />
            )}

            <br />
            {isError && (
              <Text color="red.600">
                "Token de verificación no válido: Vuelva a realizar el
                registro."
              </Text>
            )}
            {error && <Text color="red.600">{error}</Text>}
          </>
        ) : (
          <>
            <Text fontSize="2xl" mb={3}>
              ¡Tu correo ha sido verificado!
            </Text>
            <Text fontSize="2xl" mb={6}>
              Ahora puedes iniciar sesión.
            </Text>
            <br />
            <Button
              size="lg"
              color="purple.700"
              bg="gray.100"
              onClick={() => navigate("/LogIn")}
            >
              Iniciar sesión
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}
