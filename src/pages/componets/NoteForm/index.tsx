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
  useToast,
  ModalFooter,
  Button,
  Select,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import Feature from "../Feature";
import { noteSchema, noteForm } from "../../../schemas/noteSchema";
import useCreateNote from "./useCreateNote";
import useNotesStore from "../../../states/NotesStore";
import useFoldersStore from "../../../states/FoldersStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function NoteForm({ isOpen, onClose }: Props) {
  const toast = useToast();
  const { folders, currentFolder } = useFoldersStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<noteForm>({
    resolver: zodResolver(noteSchema),
  });

  const mutation = useCreateNote();
  const { refreshNotes } = useNotesStore();

  useEffect(() => {
    if (!isOpen) {
      reset(); // Limpia los campos del formulario
    }
  }, [isOpen]);

  const onSubmit = (data: noteForm) => {
    mutation.mutate(data, {
      onSuccess: async (response) => {
        await refreshNotes(currentFolder); // Actualiza estado global
        toast({
          title: "Nueva nota creada",
          description:
            response.confirmation || "Los datos se guardaron correctamente.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        onClose();
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
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700">Creando Nueva Nota</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <form id="noteForm" onSubmit={handleSubmit(onSubmit)}>
            <Feature title="Nota">
              <FormControl id="title">
                <Input
                  variant="flushed"
                  placeholder="Título"
                  type="text"
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
                <Select {...register("folder_id")}>
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
                <Checkbox mt={6} {...register("ask_master_password")}>
                  <Text as="b">Pedir contraseña maestra</Text>
                </Checkbox>
              </FormControl>
            </Feature>
          </form>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button form="noteForm" type="submit" mr={3}>
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

export default NoteForm;
