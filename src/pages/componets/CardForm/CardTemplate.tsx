import { Box, Icon } from "@chakra-ui/react"
import { ReactNode } from "react"
import { FaCreditCard } from "react-icons/fa"

type Props = {
    children: ReactNode
}

function CardTemplate({children}: Props) {
  
  return (
    <Box
      //bgGradient="linear(to-r, purple.500, blue.600)"
      bgGradient="linear(to-r, gray.900, gray.700)"
      color="white"
      p={6}
      rounded="2xl"
      boxShadow="2xl"
      maxW="420px"
      mx="auto"
      mt={8}
      position="relative"
      fontFamily="monospace"
      
    >
      <Icon
        as={FaCreditCard}
        boxSize={6}
        position="absolute"
        top={4}
        right={4}
        opacity={0.8}
      />
      {children}
    </Box>
  )
}

export default CardTemplate