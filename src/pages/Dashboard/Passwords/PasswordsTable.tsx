import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, IconButton, Image, Menu, MenuButton, MenuList, MenuItem, HStack, Text, MenuDivider, useDisclosure } from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";
import { BsQuestionSquare } from "react-icons/bs";
import { PasswordItem } from "../../../types";
import { strengthLabels } from "../../../types";
import PasswordDetail from "./PasswordDetail";

import { FiCopy } from "react-icons/fi";
import { CgDetailsMore } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoNavigateOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useCopy } from '../../../useCopy';

import usePasswordDetail from "./usePasswordDetail";
import useCurrentPswDetail from "../../../states/CurrentPswDetail";

import PwdDetailSecurity from "./PwdDetailSecurity";
import PwdCopySecurity from "./PwdCopySecurity";

type Props = {
  UserPasswords: PasswordItem[];
};

type Option = "password" | "username"

const PasswordsTable = ({ UserPasswords }: Props) => {
  const [selectedPassword, setSelectedPassword] = useState<PasswordItem | null>(null)
  const [copyOption, setCopyOption] = useState<"password" | "username">("username") 

  const {mutate} = usePasswordDetail();
  const {copy} = useCopy()
  const {currentDetail, setCurrentDetail} = useCurrentPswDetail()

  const MPwdModal = useDisclosure();
  const CopyModal = useDisclosure();
  const PasswordModal = useDisclosure();

  function selectPassword(pwd: PasswordItem){
    setSelectedPassword(pwd)

    if(!pwd.ask_password){
      mutate(
        { password_id: pwd.id},
        {
          onSuccess: (data) => {
            setCurrentDetail(data)
          },
          onError: (error) => {
            console.error("Error al obtener detalles:", error);
          },
        }
      )
    } else{
      MPwdModal.onOpen()
    }
  }

  function copyContent(pwd: PasswordItem, opt: Option){
    setSelectedPassword(pwd)

    if(!pwd.ask_password){
      mutate(
        { password_id: pwd.id },
        {
          onSuccess: (data) => {
            if(opt == "password") copy(data.password)
            else copy(data.username)
          },
          onError: (error) => {
            console.error("Error al obtener contraseña:", error);
          },
        }
      )
    } else {
      if(opt == "password") setCopyOption("password")
      else setCopyOption("username")
      CopyModal.onOpen()
    }
  }

  useEffect(() => {
    if (currentDetail === null) return
    PasswordModal.onOpen()
  }, [currentDetail]);

  return (
    <Box>
      <PwdDetailSecurity isOpen={MPwdModal.isOpen} onClose={MPwdModal.onClose} pwdId={selectedPassword?.id}/>
      <PwdCopySecurity isOpen={CopyModal.isOpen} onClose={CopyModal.onClose} pwdId={selectedPassword?.id} option={copyOption}/>

      <PasswordDetail password={selectedPassword} passwordDetail={currentDetail} isOpen={PasswordModal.isOpen} onClose={PasswordModal.onClose}/>

      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Carpeta</Th>
              <Th>Nivel de seguridad</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody fontSize={18}>
            {UserPasswords.map((p) => {
              const domain = p.web_page
                ? new URL(p.web_page).hostname
                : null;
              const faviconUrl = domain
                ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
                : null;

              return (
                <Tr key={p.service_name} _hover={{ bg: "gray.200" }}>
                  <Td>
                    
                    <HStack cursor="pointer" onClick={() => selectPassword(p)}>
                      {faviconUrl ? (
                        <Image
                          src={faviconUrl}
                          alt="favicon"
                          boxSize="20px"
                          borderRadius="md"
                        />
                      ) : (
                        <BsQuestionSquare size="21px"/>
                      )}

                      <Text
                        color="#175DDC"
                        ml={4}
                        _hover={{ borderBottom: "2px solid currentColor" }}
                      >
                        {p.service_name}
                      </Text>
                    </HStack>
                    
                  </Td>
                  <Td>{p.folder === null ? "Sin carpeta" : p.folder?.name}</Td>
                  <Td>{strengthLabels[p.strength_level]}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<SlOptionsVertical />}
                        variant='outline'
                        bg="purple.700"
                        color="gray.50"
                        _hover={{bg: "purple.600"}}
                        _active={{bg: "purple.800"}}
                      />
                      <MenuList>
                        <MenuItem _hover={{bg: "gray.200"}} icon={<FiCopy />} onClick={() => copyContent(p, "username")}>
                          Copiar usuario
                        </MenuItem>
                        <MenuItem _hover={{bg: "gray.200"}} icon={<FiCopy/>} onClick={() => copyContent(p, "password")}>
                          Copiar contraseña
                        </MenuItem>
                        {p.web_page && 
                          <MenuItem _hover={{bg: "gray.200"}} icon={<IoNavigateOutline/>} onClick={
                              () => {setSelectedPassword(p); window.open(p.web_page, "_blank")}
                            }>
                            Iniciar
                          </MenuItem>
                        }
                        <MenuDivider/>
                        <MenuItem _hover={{bg: "gray.200"}} icon={<CgDetailsMore/>} onClick={() => selectPassword(p)}>
                          Detalle
                        </MenuItem>
                        <MenuItem color="red.600" _hover={{bg: "gray.200"}} icon={<RiDeleteBin6Line/>} onClick={() => console.log("Eliminar")}>
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

export default PasswordsTable;

