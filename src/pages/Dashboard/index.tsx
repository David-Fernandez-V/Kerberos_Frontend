import PasswordsTable from "./Passwords/PasswordsTable";
import NotesTable from "./Notes/NotesTable";
import CardsTable from "./CardsTable";
import Feature from "../componets/Feature";

import useFoldersStore from "../../states/FoldersStore";
import usePasswordsStore from "../../states/PasswordsStore";
import useNotesStore from "../../states/NotesStore";
import useTablesStore from "../../states/TablesStore";

import { Text } from "@chakra-ui/react";

import { useEffect } from "react";

type Props = {}

function Dashboard({}: Props) {
  const { passwords, /*isLoading,*/ refreshPasswords} = usePasswordsStore();
  const {notes, refreshNotes} = useNotesStore()
  const {currentFolder ,refreshFolders} = useFoldersStore()
  const {showPasswords, showNotes, showCards} = useTablesStore()
  
  // Llamar cuando currentFolder esté definido
  useEffect(() => {
    if (typeof currentFolder === "number") {
      refreshPasswords(currentFolder);
      refreshNotes(currentFolder)
    }
  }, [currentFolder]);

  // refrescar carpetas una vez al inicio
  useEffect(() => {
    refreshFolders();
  }, []);

  return (
    <>
      <Text fontSize="4xl" fontWeight="bold"> Mis Bóvedas</Text> <br />
      
      {showPasswords && 
        <>
          <Feature title="Sesiones">
            <PasswordsTable UserPasswords={passwords}/>
          </Feature>
          <br />
        </>
      }
      
      {showNotes &&
        <>
          <Feature title="Notas">
            <NotesTable UserNotes={notes}/>
          </Feature>
          <br />
        </>
      }
      {showCards &&
        <>
          <Feature title="Tarjetas">
            <CardsTable UserCards={passwords}/>
          </Feature>      
          <br />
        </>
      }
    </>
  )
}

export default Dashboard