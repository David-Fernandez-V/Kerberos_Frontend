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
import useChangeEmail from "./useChangeEmail";
import { useState } from "react";
import { useAuthStore } from "../../states/AuthStore";

export default function EmailChange() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const token = searchParams.get("token");

  const [isVerify, setIsVerify] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending, isError } = useChangeEmail();

  //Función para verificar
  const handleChangeEmail = () => {
    if (token) {
      mutate(
        { token: token },
        {
          onSuccess: () => {
            setIsVerify(true);
            setTimeout(() => {
              logout();
              console.log("Cerrado");
            }, 5000);
          },
        }
      );
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
            fontSize={{ base: "3xl", sm: "6xl", md: "6xl" }}
            lineHeight="110%"
          >
            Cambio de correo electrónico <br />
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
              ¡Ya casi está!
            </Text>
            <Text fontSize="2xl" mb={6}>
              Verifica tu nueva dirección de correo electrónico para poder
              realizar los cambios.
            </Text>
            <br />

            {!isPending ? (
              <Button
                size="lg"
                color="purple.700"
                bg="gray.100"
                onClick={handleChangeEmail}
              >
                Verificar
              </Button>
            ) : (
              <Spinner size="md" />
            )}

            <br />
            {isError && (
              <Text color="red.600">
                Token de verificación no válido: Vuelva a realizar el registro.
              </Text>
            )}
            {error && <Text color="red.600">{error}</Text>}
            {(isError || error) && (
              <Button
                size="lg"
                color="purple.700"
                bg="gray.100"
                mt={4}
                onClick={() => navigate("/dashboard")}
              >
                Volver
              </Button>
            )}
          </>
        ) : (
          <>
            <Text fontSize="2xl" mb={3}>
              ¡Tu correo ha sido verificado!
            </Text>
            <Text fontSize="2xl" mb={6}>
              Ahora puedes iniciar sesión con tu nuevo correo.
            </Text>
            <br />
            <Text fontSize="2xl" mb={6}>
              La sesión actual se cerrará.
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
}
