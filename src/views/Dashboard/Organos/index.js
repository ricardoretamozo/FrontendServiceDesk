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
  
  import OrganoAgregarModal from "./components/OrganoAgregarModal";
  
  import { listOrganos, deleteOrgano, updateOrgano } from "actions/organos";
  
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
  
  const Organos = (props) => {
    
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
  
    const [open, setOpen] = React.useState(false);
    const [openedit, setOpenEdit] = React.useState(false);
  
    const [indice, setIndice] = useState({
        idOrgano: null,
        organo: "",
        activo: "",
        sede: {
            idSede: null,
        }
    });

    const initialOrgano = {
        idOrgano: null,
        organo: "",
        activo: "",
        sede: {
            idSede: null,
        }
      }

    const cancelRef = React.useRef()
  
    const organo = useSelector(store => store.organos);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(listOrganos());
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
 
    const removeOrgano = () =>{
      dispatch(deleteOrgano(indice))
      .then(() =>{
        dispatch(listOrganos());
        console.log('Organo eliminada');
      })
      .catch(e =>{
        console.log(e)
      });
    }

    const [userorgano, setOrgano] = useState(initialOrgano);
  
    const actualizarOrgano = () => {
    //  e.preventDefault()
    const { idOrgano, organo, activo, sede } = userorgano;
      dispatch(updateOrgano(idOrgano, organo, activo, sede))
      .then((data) =>{
          setOrgano({
            id: data.idOrgano,
            organo: data.organo,
            activo: data.activo,
            sede: data.sede.idSede,
          })
        dispatch(listOrganos());
        handleCloseEdit(true)
    })
      .catch(a => {
        console.log(a);
      });
      setOpenEdit(false);
    };
    
    const fields = ['ID Organo', 'Organo y Estado'];
    const data = organo.map((dato) => {
      return{
        idOrgano: dato.idOrgano,
        organo: dato.organo,
        activo: dato.activo,
        sede: dato.sede.idSede,
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
                Organos Table
              </Text>
            </Box>
            <Box>
              <OrganoAgregarModal/>
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
                            {item.idOrgano}
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
                      {item.organo}
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
                              <ModalHeader display={'flex'} justifyContent={'center'}>Editar Organo</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody pb={6}>
                              <FormControl>
                                  <FormLabel>Organo</FormLabel>
                                  <Input
                                    value={indice ? (indice.idOrgano) : ("")}
                                    disabled={true}
                                    type="text"
                                    //defaultValue={indice ? (indice.nombre):("")}
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Organo</FormLabel>
                                  <Input
                                    autoFocus
                                    defaultValue={indice ? (indice.organo) : ("")}
                                    type="text"
                                    //defaultValue={item ? (item.perfil):("")}
                                    //defaultValue={indice ? (indice.nombre):("")}
                                    onChange={(e)=>setOrgano({...indice,organo:e.target.value})}
                                  />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Activo</FormLabel>
                                    <Textarea
                                        autoFocus
                                        defaultValue={indice ? (indice.activo):("")}
                                        // defaultValue={item ? (item.descripcion):("")}
                                        onChange={(e)=>setOrgano({...indice,activo:e.target.value})}
                                        placeholder='S/N'
                                        type="text"
                                    />
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Sede</FormLabel>
                                  <Input
                                    autoFocus
                                    defaultValue={indice ? (indice.sede) : ("")}
                                    type="number"
                                    //defaultValue={item ? (item.perfil):("")}
                                    //defaultValue={indice ? (indice.nombre):("")}
                                    onChange={(e)=>setOrgano({...indice,sede:e.target.value})}
                                  />
                                </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                <Button onClick={(e)=>actualizarOrgano(e)} colorScheme='blue' mr={3}>
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
                  <Button leftIcon={<DeleteIcon />} colorScheme= {'red'} size={'md'} onClick={()=>handleClickOpen(item.idOrgano)}>
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
                              Eliminar Organo
                            </AlertDialogHeader>
  
                            <AlertDialogBody>
                              Está seguro de eliminar?
                            </AlertDialogBody>
  
                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={handleClose}>
                                Cancelar
                              </Button>
                              <Button onClick={()=>removeOrgano(item.idOrgano)} colorScheme='red' ml={3}>
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
  
  export default Organos;
  