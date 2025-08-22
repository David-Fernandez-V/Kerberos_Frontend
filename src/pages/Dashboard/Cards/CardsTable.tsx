import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  MenuDivider,
} from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaCreditCard } from "react-icons/fa";
import { CardItem } from "../../../types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";

import useCurrentCardDetail from "../../../states/CurrentCardDetail";
import useCardDetail from "./useCardDetail";
import CardDetailSecurity from "./CardDetailSecurity";
import CardDetail from "./CardDetail";
import { FiCopy } from "react-icons/fi";
import { useCopy } from "../../../useCopy";
import CardCopySecurity from "./CardCopySecurity";

type Props = {
  UserCards: CardItem[];
};

const CardsTable = ({ UserCards }: Props) => {
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [copyOption, setCopyOption] = useState<"number" | "csv">("number");

  const { mutate } = useCardDetail();
  const { copy } = useCopy();
  const { currentDetail, setCurrentDetail } = useCurrentCardDetail();

  const MPwdModal = useDisclosure();
  const CardModal = useDisclosure();
  const CopyModal = useDisclosure();

  useEffect(() => {
    if (currentDetail === null) return;
    CardModal.onOpen();
  }, [currentDetail]);

  function selectCard(card: CardItem) {
    setSelectedCard(card);

    if (!card.ask_password) {
      mutate(
        { card_id: card.id },
        {
          onSuccess: (data) => {
            setCurrentDetail(data);
          },
          onError: (error) => {
            console.error("Error al obtener tarjeta:", error);
          },
        }
      );
    } else {
      MPwdModal.onOpen();
    }
  }

  function copyContent(card: CardItem, opt: "number" | "csv") {
    setSelectedCard(card);

    if (!card.ask_password) {
      mutate(
        { card_id: card.id },
        {
          onSuccess: (data) => {
            if (opt == "number") copy(data.number);
            else copy(data.csv);
          },
          onError: (error) => {
            console.error("Error al obtener contraseña:", error);
          },
        }
      );
    } else {
      setCopyOption(opt);
      CopyModal.onOpen();
    }
  }

  return (
    <Box>
      <CardDetailSecurity
        isOpen={MPwdModal.isOpen}
        onClose={MPwdModal.onClose}
        cardId={selectedCard?.id}
      />
      <CardCopySecurity
        isOpen={CopyModal.isOpen}
        onClose={CopyModal.onClose}
        cardId={selectedCard?.id}
        option={copyOption}
      />
      <CardDetail
        card={selectedCard}
        cardDetail={currentDetail}
        isOpen={CardModal.isOpen}
        onClose={CardModal.onClose}
      />

      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Carpeta</Th>
              <Th>Tipo</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody fontSize={18}>
            {UserCards.map((c) => {
              return (
                <Tr key={c.id} _hover={{ bg: "gray.200" }}>
                  <Td>
                    <HStack cursor="pointer" onClick={() => selectCard(c)}>
                      <FaCreditCard size="21px" />
                      <Text
                        color="#175DDC"
                        ml={4}
                        _hover={{ borderBottom: "2px solid currentColor" }}
                      >
                        {c.alias}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>{c.folder === null ? "Sin carpeta" : c.folder?.name}</Td>
                  <Td>{c.type}</Td>
                  <Td>
                    {/*Menu de botón*/}
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<SlOptionsVertical />}
                        variant="outline"
                        bg="purple.700"
                        color="gray.50"
                        _hover={{ bg: "purple.600" }}
                        _active={{ bg: "purple.800" }}
                      />
                      <MenuList>
                        <MenuItem
                          _hover={{ bg: "gray.200" }}
                          icon={<FiCopy />}
                          onClick={() => copyContent(c, "number")}
                        >
                          Copiar número
                        </MenuItem>
                        <MenuItem
                          _hover={{ bg: "gray.200" }}
                          icon={<FaCreditCard />}
                          onClick={() => selectCard(c)}
                        >
                          Detalle
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                          color="red.600"
                          _hover={{ bg: "gray.200" }}
                          icon={<RiDeleteBin6Line />}
                          onClick={() => console.log("Eliminar")}
                        >
                          Eliminar
                        </MenuItem>
                      </MenuList>
                    </Menu>
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
