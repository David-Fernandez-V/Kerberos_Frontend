import PasswordsTable from "./Passwords/PasswordsTable";
import NotesTable from "./Notes/NotesTable";
import CardsTable from "./Cards/CardsTable";
import Feature from "../componets/Feature";

import useFoldersStore from "../../states/FoldersStore";
import usePasswordsStore from "../../states/PasswordsStore";
import useNotesStore from "../../states/NotesStore";
import useCardsStore from "../../states/CardsStore";
import useTablesStore from "../../states/TablesStore";

import { Text } from "@chakra-ui/react";

import { useEffect } from "react";



type Props = {}

function Dashboard({}: Props) {
  const {passwords, /*isLoading,*/ refreshPasswords} = usePasswordsStore();
  const {notes, refreshNotes} = useNotesStore()
  const {cards, refreshCards} = useCardsStore()
  const {currentFolder ,refreshFolders} = useFoldersStore()
  const {showPasswords, showNotes, showCards} = useTablesStore()
  
  // Llamar cuando currentFolder esté definido
  useEffect(() => {
    if (typeof currentFolder === "number") {
      refreshPasswords(currentFolder);
      refreshNotes(currentFolder)
      refreshCards(currentFolder)
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
      
      {showCards &&
        <>
          <Feature title="Tarjetas">
            <CardsTable UserCards={cards}/>
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
    </>
  )
}

export default Dashboard