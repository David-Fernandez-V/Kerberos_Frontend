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
import Feature from "../../componets/Feature";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import {
  ChangeEmailForm,
  ChangeEmailSchema,
} from "../../../schemas/changeEmailSchema";
import useRequestChangeEmail from "./useRequestChangeEmail";
import useSettings from "../../../states/SettingsStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

function RequestEmailChange({}: Props) {
  const [showMailMp, setShowMailMp] = useState(false);

  const { email } = useSettings();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
    setError: setEmailError,
  } = useForm<ChangeEmailForm>({
    resolver: zodResolver(ChangeEmailSchema),
  });

  const {
    mutate: requestEmailChange,
    isPending: isEmailPending,
    isSuccess: isEmailSucces,
  } = useRequestChangeEmail();

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

  return (
    <>
      <Feature title="Correo electrónico">
        <Input type="text" variant="flushed" isReadOnly value={email} mb={2} />
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
    </>
  );
}

export default RequestEmailChange;
