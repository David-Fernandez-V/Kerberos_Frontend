import { Flex } from "@chakra-ui/react";
import SettingsSideBar from "./SettingsSiedeBar";
import { useSidebarWs } from "../componets/SideBar/useSidebarWs";
import NameChange from "./NameChange";
import RequestEmailChange from "./RequestEmailChange";
import TimeoutChange from "./TimeoutChange";
import PasswordChange from "./PasswordChange";
import FoldersTable from "./FoldersTable";

type Props = {};

function Settings({}: Props) {
  useSidebarWs();

  return (
    <SettingsSideBar>
      <Flex gap={4} direction="column" wrap="wrap" maxW={"30%"}>
        {/*Cambio de nombre*/}
        <NameChange />

        {/*Cambio de correo */}
        <RequestEmailChange />

        {/*Timeout */}
        <TimeoutChange />

        {/*Cambio de contraseña */}
        <PasswordChange />

        {/*Cambio de carpetas*/}
        <FoldersTable />
      </Flex>
    </SettingsSideBar>
  );
}

export default Settings;
