import { Flex, SimpleGrid } from "@chakra-ui/react";
import SettingsSideBar from "./SettingsSiedeBar";
import { useSidebarWs } from "../componets/SideBar/useSidebarWs";
import NameChange from "./NameChange";
import RequestEmailChange from "./RequestEmailChange";
import TimeoutChange from "./TimeoutChange";
import PasswordChange from "./PasswordChange";
import FoldersTable from "./FoldersTable";
import useSettingsMenuStore from "../../states/SettingsMenu";

type Props = {};

function Settings({}: Props) {
  useSidebarWs();

  const { activeTab } = useSettingsMenuStore();

  return (
    <SettingsSideBar>
      <Flex
        gap={4}
        direction="column"
        wrap="wrap"
        maxW={{ base: "100%", md: "100%", lg: "65%" }}
      >
        {activeTab === "Mi cuenta" ? (
          <>
            {/* Grid para 2x2 layout */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {/*Fila 1*/}
              <NameChange />
              <TimeoutChange />

              {/*Fila 2*/}
              <RequestEmailChange />
              <PasswordChange />
            </SimpleGrid>
          </>
        ) : (
          <>
            {/*Cambio de carpetas*/}
            <FoldersTable />
          </>
        )}
      </Flex>
    </SettingsSideBar>
  );
}

export default Settings;
