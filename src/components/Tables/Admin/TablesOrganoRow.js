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
    Select
  } from "@chakra-ui/react";
  import React, {useState}from "react";
  import axios from 'axios';

  const EditarOrgano = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { idOrgano ,sede, organo} = props;
    const [ organoNombre, setNombre] = useState(organo);
    const [ organoSede, setOrganoSede] = useState(sede.idSede);
    const [ sedes, setSedes] = useState([]);

    //metodo editar
    const putOrgano = ()=> {
      const data = {
        idOrgano: idOrgano,
        sede: {
          idSede: organoSede
        },
        organo: organoNombre
      }
      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      //console.log(data);
      axios.put('http://localhost:8080/api/organos', data, config).then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e =>{
        console.log(e);
      });
    }
    //metodo conseguir sedes
    function getSedes() {
      axios.get('http://localhost:8080/api/sedes').then(res => {
        const sedesData = res.data;
        setSedes(sedesData);
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
            <ModalHeader>Editando Organo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre organo</FormLabel>
              <Input value={organoNombre} onChange={(e)=>{setNombre(e.target.value)}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Sede</FormLabel>
              <Select placeholder={sede.sede} onClick={getSedes} onChange={(e)=>{setOrganoSede(e.target.value)}} value={sede.id}>
                {sedes.map((row)=>{
                  return(
                    <option key={row.idSede} value={row.idSede}>{row.sede}</option>
                  );
                })}
              </Select>
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={putOrgano}>
                Guardar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  const EliminarOrgano = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { idOrgano } = props;

    const deleteOrganos = ()=> {
      
      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      
      axios.delete('http://localhost:8080/api/organos/'+idOrgano, config).then(res => {
        //console.log('http://localhost:8080/api/sedes/'+idSede);
        console.log(res);
        console.log(res.data);
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
            <ModalHeader>¿Esta seguro de eliminar el organo?</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button colorScheme="red" onClick={deleteOrganos} mr={3}>
                Confirmar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  function TablesOrganoRow(props) {
    const { id, sede, organo } = props;
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
        <Td minWidth={{ sm: "100px" }} pl="0px">
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {sede.sede}
          </Text>
        </Td>
        <Td>
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {organo}
            </Text>
          </Flex>
        </Td>
        <Td>
            <Stack direction="row" spacing={4}>
              <EditarOrgano idOrgano={id} sede={sede} organo={organo}/>
              <EliminarOrgano idOrgano={id} />
            </Stack>
        </Td>
      </Tr>
    );
  }
  
  export default TablesOrganoRow;
//  <Button leftIcon={<SearchIcon />}  colorScheme="blue" variant="solid"/>