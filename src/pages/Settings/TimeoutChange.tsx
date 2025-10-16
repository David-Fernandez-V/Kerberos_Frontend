import { Box, FormLabel, Select } from "@chakra-ui/react";
import useRefreshSession from "../../hooks/useRefreshSession";
import Feature from "../componets/Feature";

type Props = {};

function TimeoutChange({}: Props) {
  const { inactivityLimit, updateInactivityLimit } = useRefreshSession();

  const handleChangeTimeout = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    updateInactivityLimit(newLimit);
    localStorage.setItem("inactivityLimit", newLimit.toString());
    console.log("Tiempo: " + localStorage.getItem("inactivityLimit"));
  };

  return (
    <>
      <Feature title="Cerrado de sesión automático">
        <Box>
          <FormLabel>Tiempo de inactividad para cerrar sesión: </FormLabel>
          <Select
            value={inactivityLimit}
            onChange={handleChangeTimeout}
            w="200px"
          >
            <option value={5}>5 minutos</option>
            <option value={10}>10 minutos</option>
            <option value={15}>15 minutos</option>
            <option value={30}>30 minutos</option>
            <option value={58}>1 hora</option>
            <option value="never">Desactivado</option>
          </Select>
        </Box>
      </Feature>
    </>
  );
}

export default TimeoutChange;
