// Chakra imports
import {
    Button,
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
    useColorModeValue,Stack,
    Textarea, Radio, RadioGroup,
  } from "@chakra-ui/react";
  
  import {useDispatch, useSelector} from 'react-redux'
  import React, { useState, useEffect } from "react";
  import { createOficina } from "../../../../actions/oficinas";
  
  const OficinaAgregarModal = (props) => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch();
  
    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    }
  
    const handleCloseModal = () => {
      setOpenCreate(false);
    };
  
    const initialOficina = {
      idOficina: null,
      oficina: "",
      activo: "",
      organo: {
          idOrgano: null,
      }
    }

    //cargo
  
    const [useroficina, setOficina] = useState(initialOficina);
  
    const saveOficina = () => {
      const { oficina, activo, organo} = useroficina;
      dispatch(createOficina(oficina, activo, organo))
      .then((data) => {
        setOficina({
          id: data.idOficina,
          oficina: data.oficina,
          activo: data.activo,
          organo: data.organo.idOrgano,
        })
        handleCloseModal(true);
      // props.history.push('/perfiles');
      })
      .catch(e => {
        console.log(e);
        console.log('No se pudo crear la Oficina', { variant: 'error' });
        handleCloseModal(true);
      });
    }
  
    return (
      <>
        <Button onClick={handleClickOpenCreate} colorScheme={'blue'}>Agregar</Button>
  
        <Modal
          isOpen={openCreate}
          onClose={handleCloseModal}
          closeOnOverlayClick={true}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Agregar Nueva Oficina</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Oficina</FormLabel>
                <Input 
                onChange={(e)=> {setOficina({ ...useroficina, oficina: (e.target.value).toUpperCase() })}}
                placeholder='Oficina'
                type={'text'} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Activo</FormLabel>
                {/* <RadioGroup onChange={(e)=> {setOficina({ ...userorgano, activo: (e.target.value) })}}>
                  <Stack spacing={5} direction='row'>
                    <Radio colorScheme='blue' value='1'>
                      SI
                    </Radio>
                    <Radio colorScheme='red' value='2'>
                      NO
                    </Radio>
                  </Stack>
                </RadioGroup> */}
                <Input 
                onChange={(e)=> {setOficina({ ...useroficina, activo: (e.target.value) }); setValidation(false)}} 
                placeholder='S / N'
                type={'text'} />
                {/* <Textarea
                  onChange={(e)=> {setOficina({ ...userorgano, activo: (e.target.value) }); setValidation(false)}} 
                  placeholder='Estado'
                /> */}
              </FormControl>

              <FormControl mt={4}>
              <FormLabel>Organo</FormLabel>
              {/* <Select placeholder='Select option' onChange={(e)=> setPersona({...persona, perfilPersona: e.target.value})}>
                  {data1.map((item, idx) => (
                    <option value={item.idPerfilPersona} key={idx}>{item.perfil}</option>
                  ))}
              </Select> */}
              <Input
              onChange={(e)=> setOficina({ ...useroficina, organo : e.target.value})}
              placeholder='ORGANO'
              type={'number'}/>
            </FormControl>

            </ModalBody>
            <ModalFooter>
              <Button onClick={()=>saveOficina()} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
              </Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default OficinaAgregarModal;
  