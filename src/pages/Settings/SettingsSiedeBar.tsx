"use client";

type Props = {
  children?: ReactNode;
};

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue,
  Spacer,
} from "@chakra-ui/react";

import { NavLink as RouterLink, useNavigate } from "react-router-dom";

import { FiChevronDown } from "react-icons/fi";

import { BsSafe2 } from "react-icons/bs";

import { IconType } from "react-icons";
import { ReactNode, useEffect, useState } from "react";

import { useAuthStore } from "../../states/AuthStore";

import Kerberos from "../../icons/Kerberos";
import useProfile from "../componets/SideBar/useProfile";
import { useSidebarWs } from "../componets/SideBar/useSidebarWs";
import useSettings from "../../states/SettingsStore";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  isDrawer?: boolean;
}

const SidebarContent = ({ onClose, isDrawer, ...rest }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();

  const LinkItems: Array<LinkItemProps & { onClick: () => void }> = [
    {
      name: "Mis Bóvedas",
      icon: BsSafe2,
      onClick: () => {
        setActiveTab("Mis Bóvedas");
        onClose();
        navigate("/dashboard");
      },
    },
  ];

  return (
    <Box
      transition="0.3s ease"
      color="white"
      bg="purple.700"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={isDrawer ? "100%" : { base: 0, md: 60 }}
      pos={isDrawer ? "relative" : "fixed"}
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <RouterLink to={"/dashboard"}>
          <HStack align="center" spacing={4}>
            <Text fontSize="3xl" fontWeight="bold">
              Kerberos
            </Text>

            <Box boxSize="60px" mr={2}>
              <Kerberos width="100%" height="100%" />
            </Box>
          </HStack>
        </RouterLink>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((button) => (
        <NavItem
          key={button.name}
          icon={button.icon}
          onClick={button.onClick}
          bg={button.name === activeTab ? "teal.500" : "purple.700"}
          _hover={
            button.name === activeTab
              ? { bg: "teal.500" }
              : { bg: "purple.600" }
          }
        >
          {button.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _active={{
          bg: "teal.500",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { logout } = useAuthStore();
  const SessionModal = useDisclosure();
  const FolderModal = useDisclosure();
  const CardModal = useDisclosure();
  const NoteModal = useDisclosure();

  const { data: user } = useProfile();
  const { username, setUsername } = useSettings();

  useEffect(() => {
    if (user !== undefined) {
      setUsername(user.name);
      console.log(user.name);
    }
  }, [user]);

  useSidebarWs();

  return (
    <Flex
      pos="sticky"
      top="0"
      zIndex="1000"
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      color="gray.900"
      bg="gray.50"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        color="purple.700"
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<Kerberos width="90%" height="90%" />}
        size="lg"
        m={2}
      />

      <Text fontSize="xl" fontWeight="bold" p={4}>
        Configuración de Perfíl
      </Text>
      <Spacer />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Menu>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <MenuItem onClick={SessionModal.onOpen}>Sesión</MenuItem>
            <MenuItem onClick={CardModal.onOpen}>Tarjeta</MenuItem>
            <MenuItem onClick={NoteModal.onOpen}>Nota</MenuItem>
            <MenuDivider />
            <MenuItem onClick={FolderModal.onOpen}>Carpeta</MenuItem>
          </MenuList>
        </Menu>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar name={username} size={"md"} mr={2} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="lg">Mi perfil</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>
                <RouterLink to={"/dashboard"}>Mis Bóvedas</RouterLink>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Cerrar Sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SettingsSideBar = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showSidebarStatic = useBreakpointValue({ base: false, md: true });

  return (
    <Box minH="100vh" color="gray.900" bg="gray50">
      {showSidebarStatic ? (
        // Mostrar sidebar fijo en pantallas md+
        <SidebarContent onClose={onClose} />
      ) : (
        // Mostrar drawer en pantallas pequeñas
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="xs"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} isDrawer />
          </DrawerContent>
        </Drawer>
      )}

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SettingsSideBar;
