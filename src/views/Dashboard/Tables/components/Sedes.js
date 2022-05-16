// Chakra imports
import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Spacer,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
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
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesSedeRow from "components/Tables/Admin/TablesSedeRow";
  import React from "react";
  

  // Componente Modal, formulario de creacion sede.
  const AddSede = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Box p="4">
        <Button colorScheme="blue" variant={"solid"} onClick={onOpen}>Agregar</Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crear Sede</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre sede</FormLabel>
              <Input placeholder='Nombre de la sede' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Dirección</FormLabel>
              <Input placeholder='Direccion de la sede' />
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Agregar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    )
  }

  const Sedes = ({ title, captions, data }) => {
    const textColor = useColorModeValue("gray.700", "white");
    return (
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
            <Flex>
                <Box p="4">
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                    {title}
                    </Text>
                </Box>
                <AddSede/>
            </Flex>
        </CardHeader>
        <CardBody>
          <Table variant='simple' color={textColor}>
            <Thead>
              <Tr my='.8rem' pl='0px' color='gray.400'>
                {captions.map((caption, idx) => {
                  return (
                    <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row) => {
                return (
                  <TablesSedeRow
                    key={row.id}
                    id={row.id}
                    sede={row.sede}
                    direccion={row.direccion}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  };
  
  export default Sedes;
  