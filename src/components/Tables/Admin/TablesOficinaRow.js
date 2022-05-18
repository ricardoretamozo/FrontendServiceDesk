import { DeleteIcon, EditIcon, NotAllowedIcon } from "@chakra-ui/icons";
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
  import React, {useState} from "react";
  import axios from 'axios';

  const EditarOficina = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { idOficina , organo, oficina} = props;
    const [ oficinaNombre, setNombre] = useState(oficina);
    const [ oficinaOrgano, setOficinaOrgano] = useState(organo.idOrgano);
    const [ organos, setOrganos] = useState([]);

    const putOficina = ()=> {
      const data = {
        idOficina: idOficina,
        organo: {
          idOrgano: oficinaOrgano
        },
        oficina: oficinaNombre
      }
      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      //console.log(data);
      axios.put('http://localhost:8080/api/oficinas', data, config).then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e =>{
        console.log(e);
      });
    }
    function getOrganos() {
      axios.get('http://localhost:8080/api/organos').then(res => {
        const organosData = res.data;
        setOrganos(organosData);
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
            <ModalHeader>Editando Oficina</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre oficina</FormLabel>
              <Input value={oficinaNombre} onChange={(e)=>{setNombre(e.target.value)}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Organo</FormLabel>
              <Select placeholder={organo.organo} onClick={getOrganos} onChange={(e)=>{setOficinaOrgano(e.target.value)}} value={organo.idOrgano}>
                {organos.map((row)=>{
                  return(
                    <option key={row.idOrgano} value={row.idOrgano}>{row.organo}</option>
                  );
                })}
              </Select>
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={putOficina}>
                Guardar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  const EliminarOficina = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { idOficina } = props;

    const deleteOficinas = ()=> {
      
      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      
      axios.delete('http://localhost:8080/api/oficinas/'+idOficina, config).then(res => {
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
            <ModalHeader>¿Esta seguro de eliminar la oficina?</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button colorScheme="red" onClick={deleteOficinas} mr={3}>
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
  
  function TablesOficinaRow(props) {
    const { id, organo, oficina } = props;
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
            {organo.organo}
          </Text>
        </Td>
        <Td>
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {oficina}
            </Text>
          </Flex>
        </Td>
        <Td>
            <Stack direction="row" spacing={4}>
              <EditarOficina idOficina={id} organo={organo} oficina={oficina}/>
              <EliminarOficina idOficina={id}/>
            </Stack>
        </Td>
      </Tr>
    );
  }
  
  export default TablesOficinaRow;
  