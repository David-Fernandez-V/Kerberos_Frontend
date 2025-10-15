import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import SettingsSideBar from "./SettingsSiedeBar";
import Feature from "../componets/Feature";
import { useForm } from "react-hook-form";
import {
  ChangeNameForm,
  ChangeNameSchema,
} from "../../schemas/changeNameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useChangeName from "./useChangeName";
import useChangePassword from "./useChangePassword";
import useSettings from "../../states/SettingsStore";
import { useEffect, useState } from "react";
import {
  ChangeEmailForm,
  ChangeEmailSchema,
} from "../../schemas/changeEmailSchema";
import {
  ChangePasswordForm,
  ChangePasswordSchema,
} from "../../schemas/changePasswordSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useRequestChangeEmail from "./useRequestChangeEmail";
import useRefreshSession from "../../hooks/useRefreshSession";
import { useSidebarWs } from "../componets/SideBar/useSidebarWs";

type Props = {};

function Settings({}: Props) {
  const { username, email } = useSettings();

  const { inactivityLimit, updateInactivityLimit } = useRefreshSession();

  const {
    mutate: requestEmailChange,
    isPending: isEmailPending,
    isSuccess: isEmailSucces,
  } = useRequestChangeEmail();

  const { mutate: changeName, isPending: isNamePending } = useChangeName();
  const {
    mutate: changePassword,
    isPending: isPasswordPending,
    isSuccess: isPasswordSucces,
  } = useChangePassword();

  const [showMailMp, setShowMailMp] = useState(false);

  const [showMp, setShowMp] = useState(false);
  const [showNewMp, setShowNewMp] = useState(false);
  const [showConfirmMp, setShowConfirmMp] = useState(false);

  const {
    register: registerName,
    handleSubmit: habldeSubmitName,
    formState: { errors: nameErrors },
    setError: setNameErrors,
    setValue: setNameValue,
  } = useForm<ChangeNameForm>({
    resolver: zodResolver(ChangeNameSchema),
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
    setError: setEmailError,
  } = useForm<ChangeEmailForm>({
    resolver: zodResolver(ChangeEmailSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    setError: setPasswordError,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const handleChangeName = (data: ChangeNameForm) => {
    if (data.new_name === username) {
      setNameErrors("new_name", {
        type: "manual",
        message: "Sin cambios",
      });
      return;
    }

    changeName({ new_name: data.new_name });
  };

  const handleChangeEmail = (data: ChangeEmailForm) => {
    if (data.new_email === email) {
      setEmailError("new_email", {
        type: "manual",
        message: "Sin cambios",
      });
      return;
    }

    requestEmailChange({
      new_email: data.new_email,
      master_password: data.master_password,
    });
  };

  const handleChangePassword = (data: ChangePasswordForm) => {
    if (data.new_password !== data.confirm_password) {
      setPasswordError("confirm_password", {
        type: "manual",
        message: "La contraseña no coincide",
      });
      return;
    }

    changePassword({
      new_password: data.new_password,
      master_password: data.master_password,
    });
  };

  const handleChangeTimeout = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    updateInactivityLimit(newLimit);
    localStorage.setItem("inactivityLimit", newLimit.toString());
    console.log("Tiempo: " + localStorage.getItem("inactivityLimit"));
  };

  useEffect(() => {
    setNameValue("new_name", username);
  }, []);

  useEffect(() => {
    setNameValue("new_name", username);
  }, [username]);

  useSidebarWs();

  return (
    <SettingsSideBar>
      <Flex gap={4} direction="column" wrap="wrap" maxW={"30%"}>
        {/*Cambio de nombre */}
        <Feature title="Cambiar nombre">
          <form onSubmit={habldeSubmitName(handleChangeName)}>
            <FormControl>
              <Input
                type="text"
                defaultValue={username}
                {...registerName("new_name")}
              />
              {nameErrors?.new_name?.message && (
                <Text color={"red.600"}>{nameErrors?.new_name?.message}</Text>
              )}
            </FormControl>
            <br />
            {isNamePending ? (
              <Spinner />
            ) : (
              <Button type="submit">Cambiar</Button>
            )}
          </form>
        </Feature>

        {/*Cambio de correo */}
        <Feature title="Correo electrónico">
          <Input
            type="text"
            variant="flushed"
            isReadOnly
            value={email}
            mb={2}
          />
          <Divider mb={2} mt={2} />
          <form onSubmit={handleSubmitEmail(handleChangeEmail)}>
            <FormControl>
              <FormLabel>Contraseña maestra</FormLabel>
              <InputGroup>
                <Input
                  type={showMailMp ? "text" : "password"}
                  pr="3rem"
                  {...registerEmail("master_password")}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    aria-label="Cambiar visibilidad"
                    variant="ghost"
                    h="1.75rem"
                    onClick={() => setShowMailMp(!showMailMp)}
                  >
                    {showMailMp ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              {emailErrors?.master_password?.message && (
                <Text color={"red.600"}>
                  {emailErrors.master_password?.message}
                </Text>
              )}
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Nuevo correo</FormLabel>
              <Input
                type="text"
                placeholder={"correo@ejemplo.com"}
                {...registerEmail("new_email")}
              />
              {emailErrors?.new_email?.message && (
                <Text color={"red.600"}>{emailErrors.new_email.message}</Text>
              )}
            </FormControl>
            <br />
            {isEmailPending ? (
              <Spinner />
            ) : isEmailSucces ? (
              <></>
            ) : (
              <Button type="submit">Cambiar</Button>
            )}
          </form>
        </Feature>

        {/*Timeout */}
        <Feature title="Cerrado de sesión automático">
          <Box>
            <FormLabel>Tiempo de inactividad para cerrar sesión: </FormLabel>
            <Select
              value={inactivityLimit}
              onChange={handleChangeTimeout}
              w="200px"
            >
              <option value={5}>5 minutos</option>
              <option value={10}>10 minutos</option>
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={58}>1 hora</option>
              <option value="never">Desactivado</option>
            </Select>
          </Box>
        </Feature>

        {/*Cambio de contraseña */}
        <Feature title="Cambiar contraseña">
          <form onSubmit={handleSubmitPassword(handleChangePassword)}>
            <FormControl>
              <FormLabel>Contraseña maestra</FormLabel>
              <InputGroup>
                <Input
                  type={showMp ? "text" : "password"}
                  pr="3rem"
                  {...registerPassword("master_password")}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    aria-label="Cambiar visibilidad"
                    variant="ghost"
                    h="1.75rem"
                    onClick={() => setShowMp(!showMp)}
                  >
                    {showMp ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              {passwordErrors?.master_password?.message && (
                <Text color={"red.600"}>
                  {passwordErrors.master_password?.message}
                </Text>
              )}
            </FormControl>
            <Divider mb={2} mt={2} />
            <FormControl>
              <FormLabel>Nueva contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showNewMp ? "text" : "password"}
                  pr="3rem"
                  {...registerPassword("new_password")}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    aria-label="Cambiar visibilidad"
                    variant="ghost"
                    h="1.75rem"
                    onClick={() => setShowNewMp(!showNewMp)}
                  >
                    {showNewMp ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              {passwordErrors?.new_password?.message && (
                <Text color={"red.600"}>
                  {passwordErrors.new_password?.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <br />
              <FormLabel>Confirmar contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmMp ? "text" : "password"}
                  pr="3rem"
                  {...registerPassword("confirm_password")}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    aria-label="Cambiar visibilidad"
                    variant="ghost"
                    h="1.75rem"
                    onClick={() => setShowConfirmMp(!showConfirmMp)}
                  >
                    {showConfirmMp ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              {passwordErrors?.confirm_password?.message && (
                <Text color={"red.600"}>
                  {passwordErrors.confirm_password?.message}
                </Text>
              )}
            </FormControl>
            <br />
            {isPasswordPending ? (
              <Spinner />
            ) : isPasswordSucces ? (
              <></>
            ) : (
              <Button type="submit">Cambiar</Button>
            )}
          </form>
        </Feature>

        {/* */}
      </Flex>
    </SettingsSideBar>
  );
}

export default Settings;
