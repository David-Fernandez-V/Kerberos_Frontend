import {
  Text,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  Textarea,
  Checkbox,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Tooltip,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { CardDetailItem, CardItem } from "../../../types";
import { useCopy } from "../../../useCopy";
import useCurrentCardDetail from "../../../states/CurrentCardDetail";
import Feature from "../../componets/Feature";
import CardTemplate from "../../componets/CardForm/CardTemplate";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import CardConfirmation from "./CardConfirmation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  card: CardItem | null;
  cardDetail: CardDetailItem | null;
  masterPwd: string | null;
};

function CardDetail({ isOpen, onClose, card, cardDetail, masterPwd }: Props) {
  const [showNumber, setShowNumber] = useState(false);
  const [showCsv, setShowCsv] = useState(false);

  const { copy } = useCopy();
  const { currentDetail, reset } = useCurrentCardDetail();

  const ConfirmationAlert = useDisclosure();

  //Borrar tarjeta
  const hanldeDelete = () => {
    ConfirmationAlert.onOpen();
  };

  //Reiniciar valores
  useEffect(() => {
    if (!isOpen) {
      reset();
      return;
    }

    if (currentDetail === null || !card) {
      onClose();
    }

    setShowNumber(false);
    setShowCsv(false);
  }, [isOpen]);

  return (
    <>
      <CardConfirmation
        isOpen={ConfirmationAlert.isOpen}
        onClose={ConfirmationAlert.onClose}
        card={card}
        masterPwd={masterPwd}
        onCloseDetail={onClose}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="purple.700">Detalle de Tarjeta</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <form id="cardForm">
              <Feature title="Alias">
                <FormControl id="alias">
                  <Input type="text" isReadOnly value={card?.alias} />
                </FormControl>
              </Feature>
              <br />

              {/* Información de la tarjeta*/}

              <Feature title="Datos de la tarjeta">
                <CardTemplate>
                  <FormControl mb={3} id="cardgolder_name">
                    <FormLabel>Nombre del titular</FormLabel>
                    <Input
                      value={cardDetail?.cardholder_name}
                      isReadOnly
                      variant="flushed"
                      borderBottomColor="whiteAlpha.600"
                    />
                  </FormControl>

                  <FormControl mb={3} id="number">
                    <FormLabel>Número</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        value={
                          showNumber
                            ? cardDetail?.number
                                .replace(/(.{4})/g, "$1 ")
                                .trim()
                            : "xxxx xxxx xxxx xxxx"
                        } //Dar formato
                        isReadOnly
                        variant="flushed"
                        borderBottomColor="whiteAlpha.600"
                      />
                      <InputRightElement width="4.5rem">
                        <IconButton
                          aria-label="Cambiar visibilidad"
                          mr={2}
                          variant="ghost"
                          color="gray.50"
                          _hover={{ color: "gray.700", bg: "gray.50" }}
                          h="1.75rem"
                          onClick={() => setShowNumber(!showNumber)}
                        >
                          {showNumber ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                        <Tooltip label="Copiar número">
                          <IconButton
                            aria-label="Copiar"
                            mr={3}
                            h="1.75rem"
                            onClick={() =>
                              copy(cardDetail ? cardDetail.number : "")
                            }
                          >
                            <FiCopy />
                          </IconButton>
                        </Tooltip>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <HStack>
                    <FormControl id="expiration_month">
                      <FormLabel>Mes de expiración</FormLabel>
                      <Input
                        value={cardDetail?.expiration_month}
                        isReadOnly
                        variant="flushed"
                        borderBottomColor="whiteAlpha.600"
                      />
                    </FormControl>

                    <FormControl id="expiration_year">
                      <FormLabel>Año de expiración</FormLabel>
                      <Input
                        value={cardDetail?.expiration_year}
                        isReadOnly
                        variant="flushed"
                        borderBottomColor="whiteAlpha.600"
                      />
                    </FormControl>

                    <FormControl id="csv">
                      <FormLabel>
                        <br />
                        CSV
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type="text"
                          value={
                            cardDetail?.csv
                              ? showCsv
                                ? cardDetail.csv
                                : "xxx"
                              : ""
                          }
                          isReadOnly
                          variant="flushed"
                          borderBottomColor="whiteAlpha.600"
                        />
                        {cardDetail?.csv && (
                          <InputRightElement width="4.5rem">
                            <IconButton
                              aria-label="Cambiar visibilidad"
                              mr={2}
                              variant="ghost"
                              color="gray.50"
                              _hover={{ color: "gray.700", bg: "gray.50" }}
                              h="1.75rem"
                              onClick={() => setShowCsv(!showCsv)}
                            >
                              {showCsv ? <FaEyeSlash /> : <FaEye />}
                            </IconButton>
                            <Tooltip label="Copiar csv">
                              <IconButton
                                aria-label="Copiar"
                                mr={3}
                                h="1.75rem"
                                onClick={() => copy(cardDetail.csv)}
                              >
                                <FiCopy />
                              </IconButton>
                            </Tooltip>
                          </InputRightElement>
                        )}
                      </InputGroup>
                    </FormControl>
                  </HStack>
                </CardTemplate>
              </Feature>
              <br />

              {/*Opciones extra */}

              <Feature title="Opciones extras">
                <HStack>
                  <FormControl id="type">
                    <FormLabel>Tipo de tarjeta</FormLabel>
                    <Input value={card?.type ? card.type : ""} isReadOnly />
                  </FormControl>

                  <FormControl id="brand">
                    <FormLabel>Marca</FormLabel>
                    <Input value={card?.brand ? card.brand : ""} isReadOnly />
                  </FormControl>
                </HStack>

                <FormControl id="folder" mt={6}>
                  <FormLabel>Carpeta</FormLabel>
                  <Input
                    value={card?.folder ? card.folder.name : "Sin carpeta"}
                    isReadOnly
                  />
                </FormControl>

                <FormControl id="notes" mt={6}>
                  <FormLabel>Notas</FormLabel>
                  <Textarea
                    value={cardDetail?.notes ? cardDetail.notes : ""}
                    isReadOnly
                  />
                </FormControl>

                <FormControl id="masterPassword">
                  <Checkbox
                    mt={6}
                    isChecked={card?.ask_password || false}
                    isReadOnly
                  >
                    <Text as="b">Pedir contraseña maestra</Text>
                  </Checkbox>
                </FormControl>
              </Feature>
              <br />

              <Feature title="Historial">
                <HStack>
                  <Text fontWeight="bold">Ultima modificación:</Text>
                  <Text>
                    {cardDetail &&
                      new Date(cardDetail.updated_at).toLocaleString()}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Creado: </Text>
                  <Text>
                    {cardDetail &&
                      new Date(cardDetail.created_at).toLocaleString()}
                  </Text>
                </HStack>
              </Feature>
            </form>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Flex w="100%">
              <Tooltip label="Eliminar sesión">
                <IconButton
                  ml={5}
                  mr={2}
                  aria-label="Borrar"
                  variant="ghost"
                  color="red.600"
                  onClick={hanldeDelete}
                >
                  <RiDeleteBin6Line size={30} />
                </IconButton>
              </Tooltip>
              <Spacer />
              <Button mr={3}>Editar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardDetail;
