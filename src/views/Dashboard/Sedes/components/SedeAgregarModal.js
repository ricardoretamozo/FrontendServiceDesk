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
    Textarea,
  } from "@chakra-ui/react";
  
  import {useDispatch, useSelector} from 'react-redux'
  import React, { useState, useEffect } from "react";
  import { createSede } from "../../../../actions/sedes";
  
  const SedeAgregarModal = (props) => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch();
  
    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    }
  
    const handleCloseModal = () => {
      setOpenCreate(false);
    };
  
    const initialSede = {
        idSede: null,
        sede: "",
        direccion: "",
        activo: ""
    }
  
    const [usersede, setSede] = useState(initialSede);
  
    const saveSede = () => {
      const { sede, direccion, activo} = usersede;
      dispatch(createSede(sede, direccion, activo))
      .then((data) => {
        setSede({
            idSede: data.idSede,
            sede: data.sede,
            direccion: data.direccion,
            activo: data.activo
        })
       handleCloseModal(true);
      // props.history.push('/perfiles');
      })
      .catch(e => {
        console.log(e);
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
            <ModalHeader>Agregar Nueva Sede</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Sede</FormLabel>
                <Input 
                onChange={(e)=> {setSede({ ...usersede, sede: (e.target.value).toUpperCase() })}}
                placeholder='Sede'
                type={'text'} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Direccion</FormLabel>
                <Textarea
                  onChange={(e)=> {setSede({ ...usersede, direccion: (e.target.value) })}} 
                  placeholder='Direccion'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Activo</FormLabel>
                <Input 
                onChange={(e)=> {setSede({ ...usersede, activo: (e.target.value).toUpperCase() })}}
                placeholder='S / N'
                type={'text'} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={()=>saveSede()} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
              </Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default SedeAgregarModal;
  