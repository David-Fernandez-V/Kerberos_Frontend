import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useSidebarWs } from "./componets/SideBar/useSidebarWs";

type Props = {
  children?: ReactNode;
};

function Layout({ children }: Props) {
  useSidebarWs();

  return (
    <Box bg="gray.50">
      <div className="container">{children ?? <Outlet />}</div>
    </Box>
  );
}

export default Layout;
