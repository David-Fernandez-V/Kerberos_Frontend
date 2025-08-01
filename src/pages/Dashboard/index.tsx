import PasswordsTable from "./Passwords/PasswordsTable";
import NotesTable from "./Notes/NotesTable";
import CardsTable from "./Cards/CardsTable";
import Feature from "../componets/Feature";

import useFoldersStore from "../../states/FoldersStore";
import usePasswordsStore from "../../states/PasswordsStore";
import useNotesStore from "../../states/NotesStore";
import useTablesStore from "../../states/TablesStore";

import { Text } from "@chakra-ui/react";

import { useEffect } from "react";

import { CardItem } from "../../types";

type Props = {}

function Dashboard({}: Props) {
  const { passwords, /*isLoading,*/ refreshPasswords} = usePasswordsStore();
  const {notes, refreshNotes} = useNotesStore()
  const {currentFolder ,refreshFolders} = useFoldersStore()
  const {showPasswords, showNotes, showCards} = useTablesStore()

  const cards: CardItem[] = [{alias:"prueba", ask_password:true, brand:"MasterCard", folder:{id:1, name:"Personal"}, id:1, last4:"1234", type:"Credito"}]
  
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