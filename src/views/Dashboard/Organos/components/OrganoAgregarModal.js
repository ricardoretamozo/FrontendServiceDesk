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
  import { createOrgano } from "../../../../actions/organos";
  
  const OrganoAgregarModal = (props) => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch();
  
    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    }
  
    const handleCloseModal = () => {
      setOpenCreate(false);
    };
  
    const initialOrgano = {
      idOrgano: null,
      organo: "",
      activo: "",
      sede: {
          idSede: null,
      }
    }

    //cargo
  
    const [userorgano, setOrgano] = useState(initialOrgano);
  
    const saveOrgano = () => {
      const { organo, activo, sede} = userorgano;
      dispatch(createOrgano(organo, activo, sede))
      .then((data) => {
        setOrgano({
          id: data.idOrgano,
          organo: data.organo,
          activo: data.activo,
          sede: data.sede.idSede,
        })
        handleCloseModal(true);
      // props.history.push('/perfiles');
      })
      .catch(e => {
        console.log(e);
        console.log('No se pudo crear el Organo', { variant: 'error' });
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
            <ModalHeader>Agregar Nuevo Organo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Organo</FormLabel>
                <Input 
                onChange={(e)=> {setOrgano({ ...userorgano, organo: (e.target.value).toUpperCase() })}}
                placeholder='Organo'
                type={'text'} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Activo</FormLabel>
                {/* <RadioGroup onChange={(e)=> {setOrgano({ ...userorgano, activo: (e.target.value) })}}>
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
                onChange={(e)=> {setOrgano({ ...userorgano, activo: (e.target.value) }); setValidation(false)}} 
                placeholder='S / N'
                type={'text'} />
                {/* <Textarea
                  onChange={(e)=> {setOrgano({ ...userorgano, activo: (e.target.value) }); setValidation(false)}} 
                  placeholder='Estado'
                /> */}
              </FormControl>

              <FormControl mt={4}>
              <FormLabel>Sede</FormLabel>
              {/* <Select placeholder='Select option' onChange={(e)=> setPersona({...persona, perfilPersona: e.target.value})}>
                  {data1.map((item, idx) => (
                    <option value={item.idPerfilPersona} key={idx}>{item.perfil}</option>
                  ))}
              </Select> */}
              <Input
              onChange={(e)=> setOrgano({ ...userorgano, sede : e.target.value})}
              placeholder='SEDE'
              type={'number'}/>
            </FormControl>

            </ModalBody>
            <ModalFooter>
              <Button onClick={()=>saveOrgano()} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
              </Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default OrganoAgregarModal;
  