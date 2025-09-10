import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

function ErrorDetail() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, purple.600, purple.700)"
          backgroundClip="text"
        >
          Error 404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          No encontrado
        </Text>
        <Text color={"gray.500"} mb={6}>
          <div>
            {isRouteErrorResponse(error)
              ? "La página no existe"
              : `Ha ocurrido un error: ${(error as Error).message}`}
          </div>
        </Text>

        <Button
          colorScheme="purple"
          color="white"
          variant="solid"
          bgGradient="linear(to-r, purple.600, purple.600, purple.700)"
          onClick={() => navigate("/LogIn")}
        >
          Inicio
        </Button>
      </Box>
    </Flex>
  );
}

export default ErrorDetail;
