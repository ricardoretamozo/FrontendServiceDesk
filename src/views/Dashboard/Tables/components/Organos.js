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
    Select
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesOrganoRow from "components/Tables/Admin/TablesOrganoRow";
  import React, {useState, useEffect} from "react";
  import axios from 'axios';

  const AgregarOrgano = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ organoNombre, setNombre] = useState('');
    const [ organoSede, setOrganoSede] = useState('');
    const [ sedes, setSedes] = useState([]);

    const postOrgano = ()=> {
      const data = {
        sede: {
          idSede: organoSede
        },
        organo: organoNombre,
      }
      console.log(data);
      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      console.log(data);
      axios.post('http://localhost:8080/api/organos', data, config).then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e =>{
        console.log(e);
      });
    }

    function getSedes() {
      axios.get('http://localhost:8080/api/sedes').then(res => {
        const sedesData = res.data;
        setSedes(sedesData);
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
            <ModalHeader>Crear Organo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre organo</FormLabel>
              <Input placeholder='Nombre del organo' onChange={(e)=>{setNombre(e.target.value)}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Dirección</FormLabel>
              <Select placeholder='Selecionar sede' onClick={getSedes} onChange={(e)=>{setOrganoSede(e.target.value)}}>
                {sedes.map((row)=>{
                  return(
                    <option key={row.idSede} value={row.idSede}>{row.sede}</option>
                  );
                })}
              </Select>
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={postOrgano}>
                Agregar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    )
  }
  
  const Organos = ({ title, captions, data }) => {
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
                <AgregarOrgano/>
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
                  <TablesOrganoRow
                    key={row.idOrgano}
                    id={row.idOrgano}
                    sede={row.sede}
                    organo={row.organo}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  };
  
  export default Organos;
  