import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Feature from "../componets/Feature";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useChangePassword from "./useChangePassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordForm,
  ChangePasswordSchema,
} from "../../schemas/changePasswordSchema";

type Props = {};

function PasswordChange({}: Props) {
  const [showMp, setShowMp] = useState(false);
  const [showNewMp, setShowNewMp] = useState(false);
  const [showConfirmMp, setShowConfirmMp] = useState(false);

  const {
    mutate: changePassword,
    isPending: isPasswordPending,
    isSuccess: isPasswordSucces,
  } = useChangePassword();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    setError: setPasswordError,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordSchema),
  });

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

  return (
    <>
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
    </>
  );
}

export default PasswordChange;
