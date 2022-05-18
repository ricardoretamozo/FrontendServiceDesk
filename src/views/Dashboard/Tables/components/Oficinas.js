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
    Select,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesOficinaRow from "components/Tables/Admin/TablesOficinaRow";
  import React, {useState} from "react";
  import axios from 'axios';


  const AgregarOficina = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ oficinaNombre, setNombre] = useState('');
    const [ oficinaOrgano, setOficinaOrgano] = useState('');
    const [ organos, setOrganos] = useState([]);

    const postOficina = ()=> {
      const data = {
        organo: {
          idOrgano: oficinaOrgano
        },
        oficina: oficinaNombre,
      }
      console.log(data);
      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      console.log(data);
      axios.post('http://localhost:8080/api/oficinas', data, config).then(res => {
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
      <Box p="4">
        <Button colorScheme="blue" variant={"solid"} onClick={onOpen}>Agregar</Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crear oficina</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre oficina</FormLabel>
              <Input placeholder='Nombre de la oficina' onChange={(e)=>{setNombre(e.target.value)}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Dirección</FormLabel>
              <Select placeholder='Selecionar organo' onClick={getOrganos} onChange={(e)=>{setOficinaOrgano(e.target.value)}}>
                {organos.map((row)=>{
                  return(
                    <option key={row.idOrgano} value={row.idOrgano}>{row.organo}</option>
                  );
                })}
              </Select>
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={postOficina}>
                Guardar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    )
  }
  const Oficinas = ({ title, captions, data }) => {
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
                    <AgregarOficina/>
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
                  <TablesOficinaRow
                    key={row.idOficina}
                    id={row.idOficina}
                    organo={row.organo}
                    oficina={row.oficina}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  };
  
  export default Oficinas;
  
  