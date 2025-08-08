import { Box, HStack, Text } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import Kerberos from "../../icons/Kerberos";

type Props = {};

function KerberosTitle({}: Props) {
  return (
    <Box
      ml={4}
      mt={1}
      position="absolute"
      top={0}
      left={0}
      color="purple.700"
      p={15}
      borderRadius={50}
      mr="auto"
    >
      <RouterLink to={"/"}>
        <HStack align="center" spacing={4}>
          <Text fontSize="4xl" fontWeight="bold">
            Kerberos
          </Text>
          <Box boxSize="90px">
            <Kerberos width="100%" height="100%" />
          </Box>
        </HStack>
      </RouterLink>
    </Box>
  );
}

export default KerberosTitle;
