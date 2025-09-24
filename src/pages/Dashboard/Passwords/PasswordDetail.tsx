import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  Divider,
  Textarea,
  InputRightElement,
  InputGroup,
  IconButton,
  Tooltip,
  Flex,
  Spacer,
  Stack,
  HStack,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

import { FiCopy } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { PasswordDetailItem, PasswordItem } from "../../../types";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Feature from "../../componets/Feature";
import { useCopy } from "../../../useCopy";
import useCurrentPswDetail from "../../../states/CurrentPswDetail";
import StrengthIndicator from "../../componets/StrengthIndicator";
import PwdConfirmation from "./PwdConfirmation";
import { PiGlobeBold } from "react-icons/pi";
import PasswordModification from "./PasswordModification";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  password: PasswordItem | null;
  passwordDetail: PasswordDetailItem | null;
  masterPwd: string | null;
};

function PasswordDetail({
  isOpen,
  onClose,
  password,
  passwordDetail,
  masterPwd,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const { copy } = useCopy();
  const { currentDetail, reset } = useCurrentPswDetail();

  const ConfirmationAlert = useDisclosure();
  const ModificationModal = useDisclosure();

  //Ícono
  const domain = password?.web_page
    ? new URL(password.web_page).hostname
    : null;
  const faviconUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    : null;

  //Borrar sesión
  const hanldeDelete = () => {
    ConfirmationAlert.onOpen();
  };
  //Abrir modificación
  const hanldeModification = () => {
    ModificationModal.onOpen();
  };

  //Reiniciar valores
  useEffect(() => {
    if (!isOpen) {
      reset();
      return;
    }

    if (currentDetail === null || !password) {
      onClose();
    }

    setShowPassword(false);
  }, [isOpen]);

  return (
    <>
      <PwdConfirmation
        isOpen={ConfirmationAlert.isOpen}
        onClose={ConfirmationAlert.onClose}
        password={password}
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
          <PasswordModification
            isOpen={ModificationModal.isOpen}
            onClose={ModificationModal.onClose}
            onCloseDetail={onClose}
            password={password}
            passwordDetail={passwordDetail}
            masterPwd={masterPwd}
          />
          <ModalHeader>
            <HStack>
              {faviconUrl ? (
                <Image
                  src={faviconUrl}
                  alt="favicon"
                  boxSize="30px"
                  borderRadius="md"
                />
              ) : (
                <PiGlobeBold size="30px" />
              )}
              <Text color="purple.700">{password?.service_name}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <form id="passwordForm" autoComplete="off">
              <Feature title="Credenciales de inicio de sesión">
                <FormControl id="user">
                  <FormLabel>Usuario</FormLabel>
                  <InputGroup>
                    <Input
                      variant="flushed"
                      type="text"
                      value={passwordDetail?.username}
                      isReadOnly
                    />
                    <InputRightElement width="4.5rem">
                      <Tooltip label="Copiar usuario">
                        <IconButton
                          aria-label="Copiar"
                          ml={3}
                          h="1.75rem"
                          onClick={() =>
                            copy(passwordDetail ? passwordDetail.username : "")
                          }
                        >
                          <FiCopy />
                        </IconButton>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <br />
                <FormControl id="password">
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Stack width="100%">
                      <Input
                        variant="flushed"
                        type={showPassword ? "text" : "password"}
                        value={passwordDetail ? passwordDetail.password : ""}
                        isReadOnly
                      />
                      {password && (
                        <StrengthIndicator
                          isLoading={false}
                          strength={password.strength_level}
                        />
                      )}
                    </Stack>
                    <InputRightElement width="4.5rem">
                      <IconButton
                        aria-label="Cambiar visibilidad"
                        variant="ghost"
                        h="1.75rem"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                      <Tooltip label="Copiar contraseña">
                        <IconButton
                          aria-label="Copiar"
                          mr={7}
                          h="1.75rem"
                          onClick={() =>
                            copy(passwordDetail ? passwordDetail.password : "")
                          }
                        >
                          <FiCopy />
                        </IconButton>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Feature>
              <br />

              <Feature title="Información extra">
                <FormControl id="webpage">
                  <FormLabel>Página web (URL)</FormLabel>
                  <Input
                    variant="flushed"
                    type="text"
                    value={password?.web_page ? password.web_page : ""}
                    isReadOnly
                  />
                </FormControl>

                <FormControl id="folder" mt={6}>
                  <FormLabel>Carpeta</FormLabel>
                  <Input
                    variant="flushed"
                    type="text"
                    value={
                      password?.folder ? password.folder.name : "Sin carpeta"
                    }
                    isReadOnly
                  />
                </FormControl>

                <FormControl id="notes" mt={6}>
                  <FormLabel>Notas</FormLabel>
                  <Textarea
                    variant="flushed"
                    value={passwordDetail?.notes ? passwordDetail.notes : ""}
                    isReadOnly
                  />
                </FormControl>

                <FormControl id="masterPassword">
                  <Checkbox
                    mt={6}
                    isChecked={password?.ask_password || false}
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
                    {passwordDetail &&
                      new Date(passwordDetail.updated_at).toLocaleString()}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Creado: </Text>
                  <Text>
                    {passwordDetail &&
                      new Date(passwordDetail.created_at).toLocaleString()}
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
              <Button mr={3} onClick={hanldeModification}>
                Editar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PasswordDetail;
