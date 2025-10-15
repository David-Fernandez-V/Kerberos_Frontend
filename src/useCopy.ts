import { useToast } from "@chakra-ui/react";

export function useCopy(){

    const toast = useToast();

    function copy(content: string) {
        navigator.clipboard.writeText(content)
        .then(() => {
            toast({
            title: "Copiado",
            description: "El contenido se ha copiado al portapapeles.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom-right",
            });
        })
        .catch((err) => {
            toast({
            title: "Error",
            description: "No se pudo copiar al portapapeles.",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom-right",
            });
            console.error("Error al copiar:", err);
        });
    }

    return {copy}
} 