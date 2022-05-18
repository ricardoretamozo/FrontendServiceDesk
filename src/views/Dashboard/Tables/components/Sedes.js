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
  import React, { useState } from "react";
  import axios from 'axios';
  

  
  // Componente Modal, formulario de creacion sede.
  const AgregarSede = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ sedeNombre, setNombre] = useState('');
    const [ sedeDireccion, setDireccion] = useState('');

    const postSedes = ()=> {
      const data = {
        sede: sedeNombre,
        direccion: sedeDireccion
      }
      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      console.log(data);
      axios.post('http://localhost:8080/api/sedes', data, config).then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e =>{
        console.log(e);
      });
    }
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
              <Input placeholder='Nombre de la sede' onChange={(e)=>{setNombre(e.target.value)}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Dirección</FormLabel>
              <Input placeholder='Direccion de la sede' onChange={(e)=>{setDireccion(e.target.value)}}/>
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={postSedes}>
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
    //const [datos, setDatos] = useState(data);
    
    return (
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
            <Flex>
                <Box p="4">
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                    {title}
                    </Text>
                </Box>
                <AgregarSede/>
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
                    key={row.idSede}
                    id={row.idSede}
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
  