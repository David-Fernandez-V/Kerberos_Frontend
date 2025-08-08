import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

function Feature({ title, children }: Props) {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl" mb={6}>
        {title}
      </Heading>
      {children}
    </Box>
  );
}

export default Feature;
