import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

import { strengthLabels, strengthColors } from "../../types";
import { useEffect, useState } from "react";

type Props = {
  isLoading: boolean;
  strength?: number;
};

const shimmer = keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`;

const MIN_LOADING_TIME = 300;

const StrengthIndicator = ({ isLoading, strength }: Props) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // "alargar" el tiempo de carga
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setShowLoading(true);
    } else if (showLoading) {
      timeout = setTimeout(() => setShowLoading(false), MIN_LOADING_TIME);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading]);

  if (showLoading) {
    return (
      <Box
        bg="gray.300"
        mt={2}
        w="100%"
        borderRadius="md"
        overflow="hidden"
        h="1.5rem"
      >
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
      </Box>
    );
  }

  if (strength !== undefined) {
    return (
      <Box
        bg="gray.300"
        mt={2}
        w="100%"
        borderRadius="md"
        overflow="hidden"
        h="1.5rem"
      >
        <Box
          w={`${(strength + 1) * 20}%`}
          h="100%"
          bg={strengthColors[strength]}
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
            {strengthLabels[strength]}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      bg="gray.300"
      mt={2}
      w="100%"
      borderRadius="md"
      overflow="hidden"
      h="1.5rem"
    />
  );
};

export default StrengthIndicator;
