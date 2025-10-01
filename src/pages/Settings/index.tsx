import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
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
import useProfile from "../componets/SideBar/useProfile";
import { useEffect } from "react";

type Props = {};

function Settings({}: Props) {
  const { data: user } = useProfile();
  const { username, email, setEmail } = useSettings();

  const { mutate, isPending: isNamePending } = useChangeName();

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

  useEffect(() => {
    if (user !== undefined) {
      setEmail(user.email);
    }
  }, [user]);

  return (
    <SettingsSideBar>
      <Flex gap={4} direction="column" wrap="wrap" maxW={"30%"}>
        {/*Cambio de nombre */}
        <Feature title="Cambiar nombre">
          <form
            action="changeNameForm"
            onSubmit={handleSubmit(handleChangeName)}
          >
            <FormControl>
              <Input
                type="text"
                defaultValue={username}
                {...register("new_name")}
              />
              {errors?.new_name?.message && (
                <Text color={"red.600"}>{errors?.new_name?.message}</Text>
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
            //{...register("new_name")}
            mb={2}
          />
          <Divider mb={2} mt={2} />
          <form>
            <FormControl>
              <FormLabel>Contraseña maestra</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Nuevo correo</FormLabel>
              <Input
                type="text"
                placeholder={"correo@ejemplo.com"}
                //{...register("new_name")}
              />
            </FormControl>
            <br />
            {isNamePending ? (
              <Spinner />
            ) : (
              <Button type="submit">Cambiar</Button>
            )}
          </form>
        </Feature>
      </Flex>
    </SettingsSideBar>
  );
}

export default Settings;
