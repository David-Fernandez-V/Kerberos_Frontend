import { Flex, Skeleton } from "@chakra-ui/react";

type Props = {};

function PublicSkeleton({}: Props) {
  return (
    <Flex h="100vh" w="100%" bg="gray.50" direction="column" p={4} gap={4}>
      <Skeleton h={{ base: "10%", md: "60px" }} w="100%" borderRadius="md" />

      <Flex flex={1} gap={4} direction={{ base: "column", md: "row" }}>
        <Skeleton flex={1} borderRadius="md" />
        <Skeleton flex={1} borderRadius="md" />
        <Skeleton flex={1} borderRadius="md" />
      </Flex>
    </Flex>
  );
}

export default PublicSkeleton;
