import {
  Text,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  ModalFooter,
  Button,
  Select,
  Textarea,
  Checkbox,
  HStack,
  useColorModeValue,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import Feature from "../Feature";

import { cardSchema, cardForm } from "../../../schemas/cardSchema";
import useCreateCard from "./useCreateCard";
import useCardsStore from "../../../states/CardsStore";
import useFoldersStore from "../../../states/FoldersStore";
import CardTemplate from "./CardTemplate";
import { months } from "../../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CardForm({ isOpen, onClose }: Props) {
  const color = useColorModeValue("black", "gray");

  const [displayValue, setDisplayValue] = useState("");

  const toast = useToast();
  const { folders, currentFolder } = useFoldersStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    reset,
  } = useForm<cardForm>({
    resolver: zodResolver(cardSchema),
  });

  const mutation = useCreateCard();
  const { refreshCards } = useCardsStore();

  useEffect(() => {
    if (!isOpen) {
      reset(); // Limpiar los campos del formulario
      setDisplayValue("");
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    const digitsOnly = raw.replace(/\D/g, "").slice(0, 16);
    const formatted = digitsOnly.replace(/(.{4})/g, "$1 ").trim();
    setDisplayValue(formatted);
    setValue("number", digitsOnly);
  };

  const onSubmit = (data: cardForm) => {
    mutation.mutate(data, {
      onSuccess: async (response) => {
        await refreshCards(currentFolder); // Actualiza estado global
        toast({
          title: "Nueva tarjeta creada",
          description:
            response.confirmation || "Los datos se guardaron correctamente.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        onClose();
      },
      onError: (error: any) => {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setError("alias", {
            type: "manual",
            message: "Álias no disponible.",
          });
        } else if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          alert("Sesión caducada. Vuelve a iniciar sesión.");
        } else {
          console.error("Error al crear nota:", error);
        }
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="purple.700">Creando Nueva Tarjeta</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <form id="cardForm" onSubmit={handleSubmit(onSubmit)}>
            <Feature title="Alias">
              <FormControl id="alias">
                <Input type="text" {...register("alias")} />
                {errors?.alias?.message && (
                  <Text color={"red.600"}>{errors?.alias?.message}</Text>
                )}
              </FormControl>
            </Feature>
            <br />

            {/* Información de la tarjeta*/}

            <Feature title="Datos de la tarjeta">
              <CardTemplate>
                <FormControl mb={3} id="cardgolder_name">
                  <FormLabel>Nombre del titular</FormLabel>
                  <Input
                    {...register("cardholder_name")}
                    placeholder="Tu nombre"
                    variant="flushed"
                    borderBottomColor="whiteAlpha.600"
                  />
                  {errors?.cardholder_name?.message && (
                    <Text color={"red.600"}>
                      {errors?.cardholder_name?.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl mb={3} id="number">
                  <FormLabel>Número</FormLabel>
                  <Input
                    {...register("number", {
                      required: false,
                    })}
                    name="number"
                    variant="flushed"
                    borderBottomColor="whiteAlpha.600"
                    value={displayValue}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    inputMode="numeric"
                    pattern="[0-9\s]*"
                    autoComplete="cc-number"
                  />
                  {errors?.number?.message && (
                    <Text color={"red.600"}>{errors?.number?.message}</Text>
                  )}
                </FormControl>

                <HStack>
                  <FormControl id="expiration_month">
                    <FormLabel>Mes de expiración</FormLabel>
                    <Select
                      {...register("expiration_month")}
                      variant="flushed"
                      borderBottomColor="whiteAlpha.600"
                    >
                      <option value="" style={{ color }}>
                        MM
                      </option>
                      {months.map((month) => (
                        <option
                          key={month.value}
                          value={month.value}
                          style={{ color }}
                        >
                          {month.value} - {month.label}
                        </option>
                      ))}
                    </Select>
                    {errors?.expiration_month?.message && (
                      <Text color={"red.600"}>
                        {errors?.expiration_month?.message}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl id="expiration_year">
                    <FormLabel>Año de expiración</FormLabel>
                    <NumberInput
                      min={1900}
                      max={2099}
                      variant="flushed"
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                      }}
                    >
                      <NumberInputField
                        {...register("expiration_year")}
                        borderBottomColor="whiteAlpha.600"
                        placeholder="YYYY"
                        inputMode="numeric"
                      />
                    </NumberInput>
                    {errors?.expiration_year?.message && (
                      <Text color={"red.600"}>
                        {errors?.expiration_year?.message}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl id="csv">
                    <FormLabel>CSV (Opcional)</FormLabel>
                    <Input
                      {...register("csv")}
                      type="number"
                      minLength={3}
                      maxLength={3}
                      placeholder="123(4)"
                      variant="flushed"
                      borderBottomColor="whiteAlpha.600"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                      }}
                    />
                    {errors?.csv?.message && (
                      <Text color={"red.600"}>{errors?.csv?.message}</Text>
                    )}
                  </FormControl>
                </HStack>
              </CardTemplate>
            </Feature>
            <br />

            {/*Opciones extra */}

            <Feature title="Opciones extras">
              <HStack>
                <FormControl id="type">
                  <FormLabel>Tipo de tarjeta</FormLabel>
                  <Select {...register("type")} placeholder="Opciones">
                    <option value="Credito">Credito</option>
                    <option value="Débito">Débito</option>
                  </Select>
                  {errors?.type?.message && (
                    <Text color={"red.600"}>{errors?.type?.message}</Text>
                  )}
                </FormControl>

                <FormControl id="brand">
                  <FormLabel>Marca</FormLabel>
                  <Select {...register("brand")} placeholder="Opciones">
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                    <option value="Diners Club">Diners Club</option>
                    <option value="JCB">JCB</option>
                    <option value="Union Pay">Union Pay</option>
                    <option value="Mir">Mir</option>
                    <option value="">Otra</option>
                  </Select>
                  {errors?.brand?.message && (
                    <Text color={"red.600"}>{errors?.brand?.message}</Text>
                  )}
                </FormControl>
              </HStack>

              <FormControl id="folder" mt={6}>
                <FormLabel>Carpeta</FormLabel>
                <Select {...register("folder_id")}>
                  <option value="null">Sin carpeta</option>
                  {folders &&
                    folders.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl id="notes" mt={6}>
                <FormLabel>Notas</FormLabel>
                <Textarea
                  placeholder="Escribe aquí..."
                  {...register("notes")}
                />
                {errors?.notes?.message && (
                  <Text color={"red.600"}>{errors?.notes?.message}</Text>
                )}
              </FormControl>

              <FormControl id="masterPassword">
                <Checkbox mt={6} {...register("ask_master_password")}>
                  <Text as="b">Pedir contraseña maestra</Text>
                </Checkbox>
              </FormControl>
            </Feature>
          </form>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button form="cardForm" type="submit" mr={3}>
            Guardar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CardForm;
