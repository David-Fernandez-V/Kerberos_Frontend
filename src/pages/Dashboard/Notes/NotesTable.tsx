import { Box, Text, Table, TableContainer, Tbody, Td, Th, Thead, Tr, IconButton, HStack, Menu, MenuButton, MenuList, MenuItem, useDisclosure, MenuDivider } from "@chakra-ui/react";
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

type Props = {
  UserNotes: NoteItem[];
};

const NotesTable = ({ UserNotes }: Props) => {
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null)

  const {mutate} = useNoteDetail();
  const {currentDetail, setCurrentDetail} = useCurrentNoteDetail()

  const MPwdModal = useDisclosure();
  const NoteModal = useDisclosure();
  
  useEffect(() => {
    if (currentDetail === null) return
    NoteModal.onOpen()
  }, [currentDetail]);

  function selectNote(note: NoteItem){
    setSelectedNote(note)

    if(!note.ask_password){
      mutate(
        { note_id: note.id},
        {
          onSuccess: (data) => {
            setCurrentDetail(data)
          },
          onError: (error) => {
            console.error("Error al obtener nota:", error);
          },
        }
      )
    } else{
      MPwdModal.onOpen()
    }
  }

  return (
    <Box>
      <NoteDetailSecurity isOpen={MPwdModal.isOpen} onClose={MPwdModal.onClose} noteId={selectedNote?.id}/>
      <NoteDetail note={selectedNote} noteDetail={currentDetail} isOpen={NoteModal.isOpen} onClose={NoteModal.onClose}/>

      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Carpeta</Th>
              <Th>Última modificación</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody fontSize={18}>
            {UserNotes.map((n) => {
              return (
                <Tr key={n.id} _hover={{ bg: "gray.200" }}>
                  <Td>
                    <HStack cursor="pointer" onClick={() => selectNote(n)}>
                      <MdEditNote size={27}/>
                      <Text
                        color="#175DDC"
                        ml={4}
                        _hover={{ borderBottom: "2px solid currentColor" }}
                      >
                        {n.title}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>{n.folder === null ? "Sin carpeta" : n.folder?.name}</Td>
                  <Td>{new Date(n.updated_at).toLocaleString()}</Td>
                  <Td>
                    {/*Menu de botón*/}
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
                        <MenuItem _hover={{bg: "gray.200"}} icon={<FaRegFolderOpen />} onClick={() => selectNote(n)}>
                          Abrir
                        </MenuItem>
                        <MenuItem _hover={{bg: "gray.200"}} icon={<ImCopy />} onClick={() => console.log("Clonar")}>
                          Clonar
                        </MenuItem>
                        <MenuDivider/>
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

export default NotesTable;
