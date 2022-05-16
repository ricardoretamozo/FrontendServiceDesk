import { EditIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
    Button,
    Flex,
    Stack,
    Td,
    Text,
    Tr,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
  } from "@chakra-ui/react";
  import React from "react";

  //Componente modal para editar una sede
  const EditarSede = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { sede, direccion} = props;
    return (
      <>
        <Button leftIcon={<EditIcon />}  colorScheme="yellow" variant="solid" onClick={onOpen}>
          EDITAR
        </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editando Sede</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre sede</FormLabel>
              <Input value={sede}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Dirección</FormLabel>
              <Input value={direccion}/>
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Guardar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  //Componente modal para anular una sede
  const AnularSede = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Button leftIcon={<NotAllowedIcon />} colorScheme="red" variant="solid" onClick={onOpen}>
          Anular
        </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>¿Esta seguro de anular la sede?</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button colorScheme="red" mr={3}>
                Confirmar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  function TablesSedeRow(props) {
    const { id, sede, direccion } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
  
    return (
      <Tr>
        <Td minWidth={{ sm: "100px" }} pl="0px">
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {id}
          </Text>
        </Td>
  
        <Td>
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {sede}
            </Text>
          </Flex>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {direccion}
          </Text>
        </Td>
        <Td>
            <Stack direction="row" spacing={4}>
                <EditarSede sede={sede} direccion={direccion}/>
                <AnularSede />
            </Stack>
        </Td>
      </Tr>
    );
  }
  
  export default TablesSedeRow;
  