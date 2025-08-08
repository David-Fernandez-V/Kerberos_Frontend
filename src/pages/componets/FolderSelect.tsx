import { Box, HStack, Text, Select } from "@chakra-ui/react";
import { FolderItem } from "../../types";
import useFoldersStore from "../../states/FoldersStore";
import { useEffect } from "react";
import usePasswordsStore from "../../states/PasswordsStore";

type Props = {
  options: FolderItem[] | null;
};

const FolderSelect = ({ options }: Props) => {
  const { currentFolder, setCurrentFolder } = useFoldersStore();
  const { refreshPasswords } = usePasswordsStore();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setCurrentFolder(selectedId);
  };

  useEffect(() => {
    refreshPasswords(currentFolder);
  }, [currentFolder]);

  return (
    <Box mr="auto" p={2.5}>
      <HStack spacing={{ base: "0", md: "6" }}>
        <Text fontSize="lg" fontWeight="bold" pr={2}>
          Carpetas
        </Text>
        <Select
          onChange={handleSelect}
          value={currentFolder !== null ? currentFolder : -2}
        >
          <option value={-1}>Todas</option>
          {options &&
            options.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          <option key={-2} value={-2}>
            Sin carpeta
          </option>
        </Select>
      </HStack>
    </Box>
  );
};

export default FolderSelect;
