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
  import React, { useState } from "react";
  import axios from 'axios';

  // Componente modal para editar una sede
  const EditarSede = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { idSede ,sede, direccion} = props;
    const [ sedeNombre, setNombre] = useState(sede);
    const [ sedeDireccion, setDireccion] = useState(direccion);

    // Metodo put para editar sedes
    const putSedes = ()=> {
      const data = {
        idSede: idSede,
        sede: sedeNombre,
        direccion: sedeDireccion
      }
      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      console.log(data);
      axios.put('http://localhost:8080/api/sedes', data, config).then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e =>{
        console.log(e);
      });
    }

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
              <Input value={sedeNombre} onChange={(e)=>{setNombre(e.target.value)}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Dirección</FormLabel>
              <Input value={sedeDireccion} onChange={(e)=>{setDireccion(e.target.value)}}/>
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={putSedes}>
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
  const AnularSede = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { idSede } = props;
    // Metodo put para eliminar sedes
    const deleteSedes = ()=> {
      
      let config = {
        headers: {
          'Content-Type': 'application/json',
          
        }
      }
      
      axios.delete('http://localhost:8080/api/sedes/'+idSede, config).then(res => {
        console.log('http://localhost:8080/api/sedes/'+idSede);
        //console.log(res);
        //console.log(res.data);
      }).catch(e =>{
        console.log(e);
      });
    }
    return (
      <>
        <Button leftIcon={<NotAllowedIcon />} colorScheme="red" variant="solid" onClick={onOpen}>
          ELIMINAR
        </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>¿Esta seguro de eliminar la sede?</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button colorScheme="red" onClick={deleteSedes} mr={3}>
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
                <EditarSede idSede={id} sede={sede} direccion={direccion}/>
                <AnularSede idSede={id}/>
            </Stack>
        </Td>
      </Tr>
    );
  }
  
  export default TablesSedeRow;
  