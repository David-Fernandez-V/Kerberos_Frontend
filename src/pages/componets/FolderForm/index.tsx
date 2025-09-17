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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { folderSchema, folderForm } from "../../../schemas/folderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import axios from "axios";

import useCreateFolder from "./useCreateFolder";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FolderForm({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<folderForm>({
    resolver: zodResolver(folderSchema),
  });

  const mutation = useCreateFolder();

  useEffect(() => {
    if (!isOpen) {
      reset(); // Limpia los campos del formulario
    }
  }, [isOpen]);

  const onSubmit = (data: folderForm) => {
    mutation.mutate(data, {
      onSuccess: async () => {
        onClose();
      },
      onError: (error: any) => {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setError("name", {
            type: "manual",
            message: "Nombre no disponible.",
          });
        } else if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          alert("Sesión caducada. Vuelve a iniciar sesión.");
        } else {
          console.error("Error al crear la carpeta:", error);
        }
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700">Nueva Carpeta</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <form
            id="folderForm"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <FormControl id="name">
              <FormLabel>Nombre</FormLabel>
              <Input type="text" {...register("name")} />
              {errors?.name?.message && (
                <Text color={"red.600"}>{errors?.name?.message}</Text>
              )}
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button form="folderForm" type="submit" mr={3}>
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

export default FolderForm;
