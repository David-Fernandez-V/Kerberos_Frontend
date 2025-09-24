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
  Select,
  Textarea,
  Checkbox,
  Spacer,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import Feature from "../../componets/Feature";
import { noteSchema, noteForm } from "../../../schemas/noteSchema";
import useModifyNote from "../Cards/useModifyNote";
import useFoldersStore from "../../../states/FoldersStore";
import { NoteItem, NoteDetailItem } from "../../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseDetail: () => void;
  note: NoteItem | null;
  noteDetail: NoteDetailItem | null;
  masterPwd: string | null;
};

function NoteModification({
  isOpen,
  onClose,
  onCloseDetail,
  note,
  noteDetail,
  masterPwd,
}: Props) {
  const { folders } = useFoldersStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<noteForm>({
    resolver: zodResolver(noteSchema),
  });

  const mutation = useModifyNote();

  const oldNote = note;
  const oldNoteDetail = noteDetail;

  const [problem, setProblem] = useState("");

  useEffect(() => {
    if (!isOpen) {
      reset(); // Limpia los campos del formulario
      setProblem("");
    }
  }, [isOpen]);

  function dataIsDiferent(data: noteForm) {
    let folder_id: number | null | undefined = note?.folder?.id;
    if (folder_id === undefined) folder_id = null;

    if (
      data.title !== oldNote?.title ||
      data.content !== oldNoteDetail?.content ||
      data.folder_id !== folder_id ||
      data.ask_master_password !== oldNote.ask_password
    )
      return true;

    return false;
  }

  const onSubmit = (data: noteForm) => {
    if (!dataIsDiferent(data)) {
      setProblem("Sin cambios");
      return;
    }

    const request = {
      note_id: note ? note.id : -1,
      master_password: masterPwd ? masterPwd : "",
    };

    mutation.mutate(
      { new_data: data, note_request: request },
      {
        onSuccess: async () => {
          onClose();
          onCloseDetail();
        },
        onError: (error: any) => {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setError("title", {
              type: "manual",
              message: "Título no disponible.",
            });
          } else if (
            axios.isAxiosError(error) &&
            error.response?.status === 401
          ) {
            alert("Sesión caducada. Vuelve a iniciar sesión.");
          } else {
            console.error("Error al crear nota:", error);
          }
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700">Modificando Nota</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <form
            id="noteForm"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <Feature title="Nota">
              <FormControl id="title">
                <Input
                  variant="flushed"
                  placeholder="Título"
                  type="text"
                  defaultValue={note?.title}
                  {...register("title")}
                />
                {errors?.title?.message && (
                  <Text color={"red.600"}>{errors?.title?.message}</Text>
                )}
              </FormControl>
              <FormControl id="notes" mt={6}>
                <Textarea
                  variant="flushed"
                  placeholder="Escribe aquí..."
                  rows={10}
                  defaultValue={noteDetail?.content}
                  {...register("content")}
                />
                {errors?.content?.message && (
                  <Text color={"red.600"}>{errors?.content?.message}</Text>
                )}
              </FormControl>
            </Feature>
            <br />
            {/*Opciones extra */}

            <Feature title="Opciones extras">
              <FormControl id="folder">
                <FormLabel>Carpeta</FormLabel>
                <Select
                  {...register("folder_id")}
                  defaultValue={note?.folder?.id}
                >
                  <option value="null">Sin carpeta</option>
                  {folders &&
                    folders.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <FormControl id="masterPassword">
                <Checkbox
                  mt={6}
                  defaultChecked={note?.ask_password}
                  {...register("ask_master_password")}
                >
                  <Text as="b">Pedir contraseña maestra</Text>
                </Checkbox>
              </FormControl>
              <br />
            </Feature>
          </form>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Text color="red.600">{problem}</Text>
          <Spacer />
          <Button form="noteForm" type="submit" ml={3} mr={3}>
            Guardar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NoteModification;
