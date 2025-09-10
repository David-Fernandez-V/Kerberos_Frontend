import {
  Box,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  MenuDivider,
} from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";
import { NoteItem } from "../../../types";
import { MdEditNote } from "react-icons/md";
import { ImCopy } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegFolderOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import useCurrentNoteDetail from "../../../states/CurrentNoteDetail";
import useNoteDetail from "./useNoteDetail";
import NoteDetail from "./NoteDetail";
import NoteDetailSecurity from "./NoteDetailSecurity";
import DeleteNoteConfirmation from "./DeleteNoteConfirmation";
import NoteDeleteSecurity from "./NoteDeleteSecurity";

type Props = {
  UserNotes: NoteItem[];
};

const NotesTable = ({ UserNotes }: Props) => {
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [masterPwd, setMasterPwd] = useState<null | string>(null);

  const { mutate } = useNoteDetail();
  const { currentDetail, setCurrentDetail } = useCurrentNoteDetail();

  const MPwdModal = useDisclosure();
  const NoteModal = useDisclosure();
  const MPwdDelete = useDisclosure();
  const ConfirmationAlert = useDisclosure();

  //Seleccionar nota
  function selectNote(note: NoteItem) {
    setSelectedNote(note);

    if (!note.ask_password) {
      mutate(
        { note_id: note.id },
        {
          onSuccess: (data) => {
            setCurrentDetail(data);
          },
          onError: (error) => {
            console.error("Error al obtener nota:", error);
          },
        }
      );
    } else {
      MPwdModal.onOpen();
    }
  }

  //Eliminar nota
  function handleDelete(note: NoteItem) {
    setSelectedNote(note);
    if (!note.ask_password) {
      ConfirmationAlert.onOpen();
    } else {
      //Medida de seguridad
      MPwdDelete.onOpen();
    }
  }

  //Abrir detalle de nota
  useEffect(() => {
    if (currentDetail === null) return;
    NoteModal.onOpen();
  }, [currentDetail]);

  return (
    <Box>
      <NoteDetailSecurity
        isOpen={MPwdModal.isOpen}
        onClose={MPwdModal.onClose}
        setMasterPwd={setMasterPwd}
        noteId={selectedNote?.id}
      />
      <NoteDeleteSecurity
        isOpen={MPwdDelete.isOpen}
        onClose={MPwdDelete.onClose}
        note={selectedNote}
      />
      <NoteDetail
        note={selectedNote}
        noteDetail={currentDetail}
        masterPwd={masterPwd}
        isOpen={NoteModal.isOpen}
        onClose={NoteModal.onClose}
      />
      <DeleteNoteConfirmation
        isOpen={ConfirmationAlert.isOpen}
        onClose={ConfirmationAlert.onClose}
        note={selectedNote}
      />

      <TableContainer>
        <Table variant="unstyled" w="100%">
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
                Última modificación
              </Th>
              <Th w={{ base: "20%", md: "20%" }} />
            </Tr>
          </Thead>
          <Tbody fontSize={18}>
            {UserNotes.map((n) => {
              return (
                <Tr key={n.id} _hover={{ bg: "gray.200" }}>
                  <Td
                    whiteSpace="normal" // permite que el texto se envuelva
                    wordBreak="break-word"
                  >
                    <HStack cursor="pointer" onClick={() => selectNote(n)}>
                      <MdEditNote size={27} />
                      <Text
                        color="#175DDC"
                        ml={4}
                        _hover={{ borderBottom: "2px solid currentColor" }}
                      >
                        {n.title}
                      </Text>
                    </HStack>
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    {n.folder === null ? "Sin carpeta" : n.folder?.name}
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    {new Date(n.updated_at).toLocaleString()}
                  </Td>
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
                          icon={<FaRegFolderOpen />}
                          onClick={() => selectNote(n)}
                        >
                          Abrir
                        </MenuItem>
                        <MenuItem
                          _hover={{ bg: "gray.200" }}
                          icon={<ImCopy />}
                          onClick={() => console.log("Clonar")}
                        >
                          Clonar
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                          color="red.600"
                          _hover={{ bg: "gray.200" }}
                          icon={<RiDeleteBin6Line />}
                          onClick={() => handleDelete(n)}
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

export default NotesTable;
