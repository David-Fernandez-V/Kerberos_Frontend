import {
  Button,
  Text,
  Divider,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import useCurrentNoteDetail from "../../../states/CurrentNoteDetail";
import { NoteDetailItem, NoteItem } from "../../../types";
import { useCopy } from "../../../useCopy";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  note: NoteItem | null;
  noteDetail: NoteDetailItem | null;
};

function NoteDetail({ isOpen, onClose, note, noteDetail }: Props) {
  const { copy } = useCopy();
  const { currentDetail, reset } = useCurrentNoteDetail();

  useEffect(() => {
    if (!isOpen) {
      reset();
      return;
    }
    if (currentDetail === null || !note) {
      onClose();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700">{note?.title}</ModalHeader>
        <ModalCloseButton />
        <Divider />

        <ModalBody>
          <div>{noteDetail?.content}</div>

          <Flex w="100%">
            <Spacer />
            <Tooltip label="Copiar contenido">
              <IconButton
                aria-label="Copiar"
                size="sm"
                borderRadius={10}
                mt={4}
                onClick={() => noteDetail && copy(noteDetail.content)}
              >
                <FiCopy size={17} />
              </IconButton>
            </Tooltip>
          </Flex>

          <br />
          <Divider />
          <HStack mt={3}>
            <Text fontWeight="bold">Ultima modificación:</Text>
            <Text>{note && new Date(note.updated_at).toLocaleString()}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Creado: </Text>
            <Text>{note && new Date(note.created_at).toLocaleString()}</Text>
          </HStack>
        </ModalBody>

        <Divider />
        <ModalFooter>
          <Flex w="100%">
            <Tooltip label="Eliminar Nota">
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

export default NoteDetail;
