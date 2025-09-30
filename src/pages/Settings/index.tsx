import {
  Button,
  Flex,
  FormControl,
  Input,
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
import useSettings from "../../states/SettingsStore";

type Props = {};

function Settings({}: Props) {
  const { username } = useSettings();

  const { mutate, isPending } = useChangeName();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ChangeNameForm>({
    resolver: zodResolver(ChangeNameSchema),
  });

  const handleChangeName = (data: ChangeNameForm) => {
    if (data.new_name === username) {
      setError("new_name", {
        type: "manual",
        message: "Sin cambios",
      });
      return;
    }

    mutate({ new_name: data.new_name });
  };

  return (
    <SettingsSideBar>
      <Flex>
        {/*Cambio de nombre */}
        <form action="changeNameForm" onSubmit={handleSubmit(handleChangeName)}>
          <Feature title="Cambiar nombre">
            <FormControl>
              <Input
                type="text"
                variant="flushed"
                defaultValue={username}
                {...register("new_name")}
              />
              {errors?.new_name?.message && (
                <Text color={"red.600"}>{errors?.new_name?.message}</Text>
              )}
            </FormControl>
            <br />
            {isPending ? <Spinner /> : <Button type="submit">Cambiar</Button>}
          </Feature>
        </form>
      </Flex>
    </SettingsSideBar>
  );
}

export default Settings;
