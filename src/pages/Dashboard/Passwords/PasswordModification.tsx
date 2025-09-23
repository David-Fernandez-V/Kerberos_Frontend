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
  Select,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { passwordForm, passwordSchema } from "../../../schemas/passwordSchema";
import useModifyPassword from "./useModifyPassword";
import Feature from "../../componets/Feature";
import axios from "axios";
import usePasswordStrength from "../../componets/SessionForm/usePasswordStrength";
import { useState, useEffect } from "react";
import useFoldersStore from "../../../states/FoldersStore";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import PasswordGenerator from "../../componets/PasswordGenerator";
import StrengthIndicator from "../../componets/StrengthIndicator";
import GeneratedPassword from "../../../states/GeneratedPassword";
import { PasswordDetailItem, PasswordItem } from "../../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseDetail: () => void;
  password: PasswordItem | null;
  passwordDetail: PasswordDetailItem | null;
  masterPwd: string | null;
};

function PasswordModification({
  isOpen,
  onClose,
  onCloseDetail,
  password,
  passwordDetail,
  masterPwd,
}: Props) {
  const { folders } = useFoldersStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<passwordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const {
    generatedPasword,
    setGeneratedPassword,
    reset: resetGenerator,
  } = GeneratedPassword();

  const oldPassword = password;
  const oldPasswordDetail = passwordDetail;

  const [problem, setProblem] = useState("");

  const mutation = useModifyPassword();
  const strengthMutation = usePasswordStrength();

  const [passwordStrength, setPasswordStrength] = useState<number | undefined>(
    undefined
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const MyModal = useDisclosure();

  useEffect(() => {
    if (!isOpen) {
      reset(); // Limpia los campos del formulario
      resetGenerator();
      setPasswordStrength(undefined);
    } else {
      if (passwordDetail) {
        setGeneratedPassword(passwordDetail?.password);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (passwordInput.trim().length === 0) {
      setPasswordStrength(undefined);
      return;
    }

    const timeout = setTimeout(() => {
      strengthMutation.mutate(passwordInput, {
        onSuccess: (data) => {
          setPasswordStrength(data.strength_level);
        },
      });
    }, 500);

    return () => clearTimeout(timeout); // limpiar el timeout si se vuelve a escribir antes de los 500ms
  }, [passwordInput]);

  useEffect(() => {
    //Setear la contraseña generada
    if (generatedPasword !== null) {
      setPasswordInput(generatedPasword);
    }
  }, [generatedPasword]);

  function dataIsDiferent(data: passwordForm) {
    if (
      data.service_name !== oldPassword?.service_name ||
      data.username !== oldPasswordDetail?.username ||
      data.password !== oldPasswordDetail.password ||
      data.web_page !== oldPassword.web_page ||
      data.notes !== oldPasswordDetail.notes ||
      data.folder_id !== oldPassword.folder?.id ||
      data.ask_master_password !== oldPassword.ask_password
    )
      return true;

    return false;
  }

  const onSubmit = (data: passwordForm) => {
    if (!dataIsDiferent(data)) {
      setProblem("Al menos un campo debe ser diferente");
      return;
    }

    const request = {
      password_id: password ? password.id : -1,
      master_password: masterPwd ? masterPwd : "",
    };

    mutation.mutate(
      { new_data: data, password_request: request },
      {
        onSuccess: async () => {
          onClose();
          onCloseDetail();
        },
        onError: (error: any) => {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setError("service_name", {
              type: "manual",
              message: "Nombre no disponible.",
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
    <>
      <PasswordGenerator isOpen={MyModal.isOpen} onClose={MyModal.onClose} />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="purple.700">Modificación de Sesión</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <form
              id="PasswordModification"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <Feature title="Nombre del elemento">
                <FormControl id="name">
                  <Input
                    type="text"
                    defaultValue={password?.service_name}
                    {...register("service_name")}
                  />
                  {errors?.service_name?.message && (
                    <Text color={"red.600"}>
                      {errors?.service_name?.message}
                    </Text>
                  )}
                </FormControl>
              </Feature>
              <br />
              <Feature title="Credenciales de inicio de sesión">
                <FormControl id="user">
                  <FormLabel>Usuario</FormLabel>
                  <Input
                    type="text"
                    defaultValue={passwordDetail?.username}
                    {...register("username")}
                    autoComplete="new-password"
                  />
                  {errors?.username?.message && (
                    <Text color={"red.600"}>{errors?.username?.message}</Text>
                  )}
                </FormControl>
                <br />
                <FormControl id="password">
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={generatedPasword !== null ? generatedPasword : ""}
                      {...register("password")}
                      onChange={(e) => {
                        setGeneratedPassword(e.target.value);
                        setPasswordInput(e.target.value);
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        aria-label="Cambiar visibilidad"
                        mr={2}
                        variant="ghost"
                        h="1.75rem"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                      <Tooltip label="Generar contraseña">
                        <IconButton
                          aria-label="Search database"
                          mr={10}
                          h="1.75rem"
                          onClick={MyModal.onOpen}
                        >
                          <LuRefreshCcw />
                        </IconButton>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                  {errors?.password?.message && (
                    <Text color={"red.600"}>{errors?.password?.message}</Text>
                  )}
                  <StrengthIndicator
                    isLoading={strengthMutation.isPending}
                    strength={passwordStrength}
                  />
                </FormControl>
              </Feature>
              <br />
              <Feature title="Opciones extras">
                <FormControl id="webpage">
                  <FormLabel>Página web (URL)</FormLabel>
                  <Input
                    type="text"
                    defaultValue={password?.web_page}
                    {...register("web_page")}
                    placeholder="https://sitio-web.com"
                    autoComplete="on"
                  />
                  {errors?.web_page?.message && (
                    <Text color={"red.600"}>{errors?.web_page?.message}</Text>
                  )}
                </FormControl>
                <FormControl id="folder" mt={6}>
                  <FormLabel>Carpeta</FormLabel>
                  <Select
                    defaultValue={password?.folder?.id}
                    {...register("folder_id")}
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
                <FormControl id="notes" mt={6}>
                  <FormLabel>Notas</FormLabel>
                  <Textarea
                    placeholder="Anotaciones"
                    defaultValue={passwordDetail?.notes}
                    {...register("notes")}
                  />
                </FormControl>
                <FormControl id="masterPassword">
                  <Checkbox mt={6} {...register("ask_master_password")}>
                    <Text as="b" defaultChecked={password?.ask_password}>
                      Pedir contraseña maestra
                    </Text>
                  </Checkbox>
                </FormControl>
              </Feature>
            </form>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Text color="red.600">{problem}</Text>
            <Button form="PasswordModification" type="submit" mr={3}>
              Guardar cambios
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PasswordModification;
