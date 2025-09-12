import { Flex, Skeleton } from "@chakra-ui/react";

type Props = {};

function PrivateSkeleton({}: Props) {
  return (
    <Flex
      h="100vh"
      w="100%"
      bg="gray.50"
      direction={{ base: "column", md: "row" }}
    >
      <Skeleton
        display={{ base: "none", md: "block" }}
        w="15%"
        h="100%"
        borderRadius="md"
      />

      <Flex
        direction="column"
        w={{ base: "100%", md: "85%" }}
        p={4}
        gap={4}
        flex={1}
      >
        <Flex
          h={{ base: "10%", md: "10%" }}
          align="center"
          gap={4}
          direction={{ base: "row", md: "row" }}
        >
          <Skeleton
            display={{ base: "block", md: "none" }}
            flex={1}
            h="40px"
            borderRadius="md"
          />
          <Skeleton
            display={{ base: "block", md: "none" }}
            boxSize="40px"
            borderRadius="full"
          />
          <Skeleton
            display={{ base: "none", md: "block" }}
            h="100%"
            flex={1}
            borderRadius="md"
          />
          <Skeleton
            display={{ base: "none", md: "block" }}
            h="100%"
            flex={1}
            borderRadius="md"
          />
          <Skeleton
            display={{ base: "none", md: "block" }}
            boxSize="50px"
            borderRadius="full"
          />
        </Flex>
        <Flex direction="column" flex={1} gap={4}>
          <Skeleton flex={1} borderRadius="md" />
          <Skeleton flex={1} borderRadius="md" />
          <Skeleton flex={1} borderRadius="md" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PrivateSkeleton;
