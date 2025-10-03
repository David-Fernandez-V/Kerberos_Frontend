import { ReactNode, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import useProfile from "./componets/SideBar/useProfile";
import useSettings from "../states/SettingsStore";
import { useSidebarWs } from "./componets/SideBar/useSidebarWs";

type Props = {
  children?: ReactNode;
};

function Layout({ children }: Props) {
  const { data: user } = useProfile();
  const { setUsername, setEmail } = useSettings();

  useEffect(() => {
    if (user !== undefined) {
      setUsername(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useSidebarWs();

  return (
    <Box bg="gray.50">
      <div className="container">{children ?? <Outlet />}</div>
    </Box>
  );
}

export default Layout;
