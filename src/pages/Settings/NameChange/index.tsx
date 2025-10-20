import { Button, FormControl, Input, Spinner, Text } from "@chakra-ui/react";
import Feature from "../../componets/Feature";
import useChangeName from "./useChangeName";
import {
  ChangeNameForm,
  ChangeNameSchema,
} from "../../../schemas/changeNameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useSettings from "../../../states/SettingsStore";

type Props = {};

function NameChange({}: Props) {
  const { mutate: changeName, isPending: isNamePending } = useChangeName();

  const { username } = useSettings();

  const {
    register: registerName,
    handleSubmit: habldeSubmitName,
    formState: { errors: nameErrors },
    setError: setNameErrors,
    setValue: setNameValue,
  } = useForm<ChangeNameForm>({
    resolver: zodResolver(ChangeNameSchema),
  });

  //Cambiar nombre
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

  //Effects

  useEffect(() => {
    setNameValue("new_name", username);
  }, []);

  useEffect(() => {
    setNameValue("new_name", username);
  }, [username]);

  return (
    <>
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
          {isNamePending ? <Spinner /> : <Button type="submit">Cambiar</Button>}
        </form>
      </Feature>
    </>
  );
}

export default NameChange;
