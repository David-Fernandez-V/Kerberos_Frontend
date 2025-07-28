import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, IconButton } from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaCreditCard } from "react-icons/fa";
import { PasswordItem } from "../../types";

type Props = {
  UserCards: PasswordItem[];
};

const CardsTable = ({ UserCards }: Props) => {
  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Nombre</Th>
              <Th>Carpeta</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {UserCards.map((c) => {
              return (
                <Tr key={c.id} _hover={{ bg: "gray.200" }}>
                  <Td>
                    <FaCreditCard size="21px"/>
                  </Td>
                  <Td>{c.service_name}</Td>
                  <Td>{c.folder === null ? "Sin carpeta" : c.folder?.name}</Td>
                  <Td>
                    <IconButton aria-label={""} color="gray.900" bg="">
                      <SlOptionsVertical />
                    </IconButton>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CardsTable;
