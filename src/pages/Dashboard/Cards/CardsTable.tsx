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
import {
  FaCcDinersClub,
  FaCcDiscover,
  FaCcJcb,
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
  FaCcAmex,
} from "react-icons/fa6";
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
import CardConfirmation from "./CardConfirmation";
import CardDeleteSecurity from "./CardDeleteSecurity";

type Props = {
  UserCards: CardItem[];
};

const CardsTable = ({ UserCards }: Props) => {
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [masterPwd, setMasterPwd] = useState<null | string>(null);
  const [copyOption, setCopyOption] = useState<"number" | "csv">("number");

  const { mutate } = useCardDetail();
  const { copy } = useCopy();
  const { currentDetail, setCurrentDetail } = useCurrentCardDetail();

  const MPwdModal = useDisclosure();
  const CardModal = useDisclosure();
  const CopyModal = useDisclosure();
  const MPwdDelete = useDisclosure();
  const ConfirmationAlert = useDisclosure();

  //Seleccionar tarjeta
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

  //Copiar contenido
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

  //Eliminar tarjeta
  function handleDelete(card: CardItem) {
    setSelectedCard(card);
    if (!card.ask_password) {
      ConfirmationAlert.onOpen();
    } else {
      //Medida de seguridad
      MPwdDelete.onOpen();
    }
  }

  //Abrir detalle de tarjeta
  useEffect(() => {
    if (currentDetail === null) return;
    CardModal.onOpen();
  }, [currentDetail]);

  return (
    <Box>
      <CardDetailSecurity
        isOpen={MPwdModal.isOpen}
        onClose={MPwdModal.onClose}
        setMasterPwd={setMasterPwd}
        cardId={selectedCard?.id}
      />
      <CardCopySecurity
        isOpen={CopyModal.isOpen}
        onClose={CopyModal.onClose}
        cardId={selectedCard?.id}
        option={copyOption}
      />
      <CardDeleteSecurity
        isOpen={MPwdDelete.isOpen}
        onClose={MPwdDelete.onClose}
        card={selectedCard}
      />
      <CardDetail
        card={selectedCard}
        cardDetail={currentDetail}
        masterPwd={masterPwd}
        isOpen={CardModal.isOpen}
        onClose={CardModal.onClose}
      />
      <CardConfirmation
        isOpen={ConfirmationAlert.isOpen}
        onClose={ConfirmationAlert.onClose}
        card={selectedCard}
      />

      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th w={{ base: "80%", md: "40%" }}>Nombre</Th>
              <Th
                display={{ base: "none", md: "table-cell" }}
                w={{ base: "0", md: "20%" }}
              >
                Carpeta
              </Th>
              <Th
                display={{ base: "none", md: "table-cell" }}
                w={{ base: "0", md: "20%" }}
              >
                Tipo
              </Th>
              <Th w={{ base: "20%", md: "20%" }} />
            </Tr>
          </Thead>
          <Tbody fontSize={18}>
            {UserCards.map((c) => {
              return (
                <Tr key={c.id} _hover={{ bg: "gray.200" }}>
                  <Td
                    whiteSpace="normal" // permite que el texto se envuelva
                    wordBreak="break-word"
                  >
                    <HStack cursor="pointer" onClick={() => selectCard(c)}>
                      {
                        /*Marca de la tarjeta */
                        c.brand === "Visa" ? (
                          <FaCcVisa size="30px" />
                        ) : c.brand === "Mastercard" ? (
                          <FaCcMastercard size="30px" />
                        ) : c.brand === "American Express" ? (
                          <FaCcAmex size="30px" />
                        ) : c.brand === "Discover" ? (
                          <FaCcDiscover size="30px" />
                        ) : c.brand === "Diners Club" ? (
                          <FaCcDinersClub size="30px" />
                        ) : c.brand === "JCB" ? (
                          <FaCcJcb size="30px" />
                        ) : (
                          <FaCreditCard size="30px" />
                        )
                      }
                      <Text
                        color="#175DDC"
                        ml={4}
                        _hover={{ borderBottom: "2px solid currentColor" }}
                      >
                        {c.alias}
                      </Text>
                    </HStack>
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    {c.folder === null ? "Sin carpeta" : c.folder?.name}
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>{c.type}</Td>
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
                          onClick={() => handleDelete(c)}
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
