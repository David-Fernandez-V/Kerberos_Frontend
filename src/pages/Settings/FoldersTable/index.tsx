import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Feature from "../../componets/Feature";
import useFoldersStore from "../../../states/FoldersStore";
import { SlOptionsVertical } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FolderItem } from "../../../types";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import DeleteFolderConfirmation from "./DeleteFolderConfirmation";
import FolderModification from "./FolderModification";

type Props = {};

function FoldersTable({}: Props) {
  const { folders, refreshFolders } = useFoldersStore();
  const [folder, setFolder] = useState<FolderItem>({ id: 0, name: "" });

  const confirmationAlert = useDisclosure();
  const modificationModal = useDisclosure();

  function handleDelete(f: FolderItem) {
    setFolder(f);
    confirmationAlert.onOpen();
  }

  function handleChange(f: FolderItem) {
    setFolder(f);
    modificationModal.onOpen();
  }

  useEffect(() => {
    refreshFolders();
  }, []);

  return (
    <Box>
      <DeleteFolderConfirmation
        folder_id={folder?.id}
        onClose={confirmationAlert.onClose}
        isOpen={confirmationAlert.isOpen}
      />
      <FolderModification
        onClose={modificationModal.onClose}
        isOpen={modificationModal.isOpen}
        folder={folder}
      />
      <Feature title="Carpetas">
        <TableContainer>
          <Table variant="unstyled" w="100%">
            <Tbody>
              {folders?.map((f) => {
                return (
                  <Tr key={f.id} _hover={{ bg: "gray.200" }}>
                    <Td>{f.name}</Td>
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
                            icon={<MdOutlineDriveFileRenameOutline />}
                            onClick={() => handleChange(f)}
                          >
                            Cambiar nombre
                          </MenuItem>
                          <MenuItem
                            color="red.600"
                            _hover={{ bg: "gray.200" }}
                            icon={<RiDeleteBin6Line />}
                            onClick={() => handleDelete(f)}
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
      </Feature>
    </Box>
  );
}

export default FoldersTable;
