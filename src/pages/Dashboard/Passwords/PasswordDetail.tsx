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
} from "@chakra-ui/react";

import { FiCopy } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { PasswordDetailItem, PasswordItem } from "../../../types";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Feature from "../../componets/Feature";
import { useCopy } from "../../../useCopy";
import useCurrentPswDetail from "../../../states/CurrentPswDetail";
import StrengthIndicator from "../../componets/SessionForm/StrengthIndicator";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  password: PasswordItem | null;
  passwordDetail: PasswordDetailItem | null;
};

function PasswordDetail({ isOpen, onClose, password, passwordDetail }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const { copy } = useCopy();
  const { currentDetail, reset } = useCurrentPswDetail();

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
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700">Detalle de la Sesión</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <form id="passwordForm">
            <Feature title="Nombre del elemento">
              <FormControl id="name">
                <Input type="text" value={password?.service_name} isReadOnly />
              </FormControl>
            </Feature>
            <br />
            <Feature title="Credenciales de inicio de sesión">
              <FormControl id="user">
                <FormLabel>Usuario</FormLabel>
                <InputGroup>
                  <Input
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

            <Feature title="Opciones extras">
              <FormControl id="webpage">
                <FormLabel>Página web (URL)</FormLabel>
                <Input
                  type="text"
                  value={password?.web_page ? password.web_page : ""}
                  isReadOnly
                />
              </FormControl>

              <FormControl id="folder" mt={6}>
                <FormLabel>Carpeta</FormLabel>
                <Input
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
  );
}

export default PasswordDetail;
