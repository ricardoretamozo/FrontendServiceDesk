// Chakra imports
import {
    Button,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    HStack,
    Box,
    useColorModeValue,
    Avatar,
    Badge,
    Flex,
    Td,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    AlertDialog,
    AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    useRef,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
  } from "@chakra-ui/react";
  
  import {useDispatch, useSelector} from 'react-redux'
  import React, { useState, useEffect } from "react";
  
  import OficinaAgregarModal from "./components/OficinaAgregarModal";
  
  import { listOficinas, deleteOficina, updateOficina } from "actions/oficinas";
  
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
  
  const Oficinas = (props) => {
    
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
  
    const [open, setOpen] = React.useState(false);
    const [openedit, setOpenEdit] = React.useState(false);
  
    const [indice, setIndice] = useState({
        idOficina: null,
        oficina: "",
        activo: "",
        organo: {
            idOrgano: null,
        }
    });

    const initialOficina = {
        idOficina: null,
        oficina: "",
        activo: "",
        organo: {
            idOrgano: null,
        }
      }

    const cancelRef = React.useRef()
  
    const oficina = useSelector(store => store.oficinas);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(listOficinas());
    },[dispatch]);
  
    const handleClickOpen = (index) => {
      setIndice(index);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClickOpenEdit = (index) => {
      setIndice(index);
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };
 
    const removeOficina = () =>{
      dispatch(deleteOficina(indice))
      .then(() =>{
        dispatch(listOficinas());
        console.log('Oficina eliminada');
      })
      .catch(e =>{
        console.log(e)
      });
    }

    const [useroficina, setOficina] = useState(initialOficina);
  
    const actualizarOficina = () => {
    //  e.preventDefault()
    const { idOficina, oficina, activo, organo} = useroficina;
      dispatch(updateOficina(idOficina, oficina, activo, organo))
      .then((data) =>{
          setOficina({
            id: data.idOficina,
            oficina: data.oficina,
            activo: data.activo,
            organo: data.organo.idOrgano,
          })
        dispatch(listOficinas());
        handleCloseEdit(true)
    })
      .catch(a => {
        console.log(a);
      });
      setOpenEdit(false);
    };
    
    const fields = ['ID Oficina', 'Oficina y Estado'];
    const data = oficina.map((dato) => {
      return{
        idOficina: dato.idOficina,
        oficina: dato.oficina,
        activo: dato.activo,
        organo: dato.organo.idOrgano,
      }
    })
  
    //console.log(data);
  
    return (
      <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
  
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
          <HStack spacing='24px' width={'100%'} justifyContent={'flex-start'} verticalAlign={'center'}>
            <Box>
              <Text fontSize='xl' color={textColor} fontWeight='bold'>
                Oficina Table
              </Text>
            </Box>
            <Box>
              <OficinaAgregarModal/>
            </Box>
          </HStack>        
        </CardHeader>
        <CardBody>
          <Table variant='simple' color={textColor} fields={fields} items={data}>
            <Thead>
              <Tr my='.8rem' pl='0px' color='gray.400'>
                {fields.map((field, idx) => {
                  return (
                    <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                      {field}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
            {data.map((item, idx) => {
              return (
            <Tr key={idx} ps={idx === 0 ? "0px" : null}>
              <Td minWidth={{ sm: "250px" }} pl="0px" >
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                  {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
                  <Td>
                      <Flex direction="column">
                          <Text
                                fontSize="md"
                                color={textColor}
                                fontWeight="bold"
                                minWidth="100%"
                              >
                            {item.idOficina}
                          </Text>
                      </Flex>
                  </Td>
                </Flex>
                </Td>
                <Td minWidth={{ sm: "250px" }} pl="0px" >
                  <Flex direction="column">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      minWidth="100%"
                    >
                      {item.oficina}
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                      {item.activo}
                    </Text>
                  </Flex>
              </Td>
              <Td>
              <Flex direction="column">
                  <Button leftIcon={<EditIcon />}  colorScheme={'yellow'} size={'md'} onClick={()=>handleClickOpenEdit(item)}>Editar</Button>
                          <Modal
                            isOpen={openedit}
                            onClose={handleCloseEdit}
                          >
                          <ModalOverlay />
                            <ModalContent>
                              <ModalHeader display={'flex'} justifyContent={'center'}>Editar Oficina</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody pb={6}>
                              <FormControl>
                                  <FormLabel>Oficina</FormLabel>
                                  <Input
                                    value={indice ? (indice.idOficina) : ("")}
                                    disabled={true}
                                    type="text"
                                    //defaultValue={indice ? (indice.nombre):("")}
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Oficina</FormLabel>
                                  <Input
                                    autoFocus
                                    defaultValue={indice ? (indice.oficina) : ("")}
                                    type="text"
                                    //defaultValue={item ? (item.perfil):("")}
                                    //defaultValue={indice ? (indice.nombre):("")}
                                    onChange={(e)=>setOficina({...indice,oficina:e.target.value})}
                                  />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Activo</FormLabel>
                                    <Textarea
                                        autoFocus
                                        defaultValue={indice ? (indice.activo):("")}
                                        // defaultValue={item ? (item.descripcion):("")}
                                        onChange={(e)=>setOficina({...indice,activo:e.target.value})}
                                        placeholder='S/N'
                                        type="text"
                                    />
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Organo</FormLabel>
                                  <Input
                                    autoFocus
                                    defaultValue={indice ? (indice.organo) : ("")}
                                    type="number"
                                    //defaultValue={item ? (item.perfil):("")}
                                    //defaultValue={indice ? (indice.nombre):("")}
                                    onChange={(e)=>setOficina({...indice,organo:e.target.value})}
                                  />
                                </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                <Button onClick={(e)=>actualizarOficina(e)} colorScheme='blue' mr={3}>
                                  Actualizar
                                </Button>
                                <Button ref={cancelRef} onClick={handleCloseEdit}>Cancelar</Button>
                              </ModalFooter>
                            </ModalContent>
                      </Modal>
                </Flex>
              </Td>
              <Td>
              <Flex direction="column">
                  <Text fontSize="md" color={textColor} fontWeight="bold">
                  <Button leftIcon={<DeleteIcon />} colorScheme= {'red'} size={'md'} onClick={()=>handleClickOpen(item.idOficina)}>
                          Eliminar
                  </Button>
                        
                      <AlertDialog
                        isOpen={open}
                        leastDestructiveRef={cancelRef}
                        onClose={handleClose}
                      > 
                      <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                              Eliminar Oficina
                            </AlertDialogHeader>
  
                            <AlertDialogBody>
                              Está seguro de eliminar?
                            </AlertDialogBody>
  
                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={handleClose}>
                                Cancelar
                              </Button>
                              <Button onClick={()=>removeOficina(item.idOficina)} colorScheme='red' ml={3}>
                                Si
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                          </AlertDialogOverlay>
                      </AlertDialog>
                  </Text>
                </Flex>

                  {/* <Menu>
                    <MenuButton bg={'transparent'} _hover={'none'} as={Button}> 
                      <TriangleDownIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem> */}
                      {/* Editar */}
                        {/* <PerfilEditarModal/> */}
                       
                      {/* </MenuItem> */}
                      {/* Eliminar */}


                      {/* <MenuItem> */}
  
                      
                      {/* </MenuItem>
                    </MenuList>
                  </Menu> */}
              
              </Td>
              
            </Tr>
              )})}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
  
      </Flex>
    );
  }
  
  export default Oficinas;
  