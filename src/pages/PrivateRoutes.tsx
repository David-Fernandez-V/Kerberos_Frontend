import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../states/AuthStore";
import { useEffect, useState } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import axios from "axios";

import useRefreshSession from "../hooks/useRefreshSession";
import PrivateSkeleton from "./componets/PrivateSkeleton";
import useCrossTabLogout from "../hooks/useCrossTabLogout";
import { useSidebarWs } from "./componets/SideBar/useSidebarWs";
import useProfile from "./componets/SideBar/useProfile";
import useSettings from "../states/SettingsStore";

const API_URL = import.meta.env.VITE_API_URL;

const PrivateRoutes = () => {
  useRefreshSession();
  useCrossTabLogout();
  useSidebarWs();

  const { data: user, refetch } = useProfile();
  const { setUsername, setEmail } = useSettings();

  useEffect(() => {
    if (user !== undefined) {
      setUsername(user.name);
      setEmail(user.email);
    } else {
      console.log("Sin user");
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, []);

  const toast = useToast();
  const { login, logout, isAuthenticated, logoutReason, clearLogoutReason } =
    useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(`${API_URL}/authentication/me`, {
          withCredentials: true,
        });
        if (res.status === 200) login(); // marcar como autenticado
      } catch (error: any) {
        logout(); //sesión no válida
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (logoutReason === "inactivity") {
      toast({
        title: "Sesión cerrada por inactividad.",
        description:
          "Por tu seguridad, se ha cerrado tu sesión automáticamente.",
        status: "warning",
        position: "top",
        duration: null,
        isClosable: true,
      });

      clearLogoutReason();
    }
  }, [logoutReason, toast, clearLogoutReason]);

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <PrivateSkeleton />
      </Flex>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
