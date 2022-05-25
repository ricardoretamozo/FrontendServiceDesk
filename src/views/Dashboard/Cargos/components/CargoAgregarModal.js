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
import CargoDataService from "../../../../service/cargoService";
import { createCargo } from "../../../../actions/cargos";

const CargoAgregarModal = (props) => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  }

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  const initialCargo = {
    idCargo: null,
    cargo: "",
    activo: "",
  }

  const [usercargo, setCargo] = useState(initialCargo);

  const saveCargo = () => {
    const { cargo, activo} = usercargo;
    dispatch(createCargo(cargo, activo))
    .then((data) => {
      setCargo({
        id: data.idCargo,
        cargo: data.cargo,
        activo: data.activo
      })
      handleCloseModal(true);
    // props.history.push('/perfiles');
    })
    .catch(e => {
      console.log(e);
      console.log('No se pudo crear la Perfil', { variant: 'error' });
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
          <ModalHeader>Agregar Nuevo Cargo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Cargo</FormLabel>
              <Input 
              onChange={(e)=> {setCargo({ ...usercargo, cargo: (e.target.value).toUpperCase() })}}
              placeholder='Cargo'
              type={'text'} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Activo</FormLabel>
              {/* <RadioGroup onChange={(e)=> {setCargo({ ...usercargo, activo: (e.target.value) })}}>
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
              onChange={(e)=> {setCargo({ ...usercargo, activo: (e.target.value) }); setValidation(false)}} 
              placeholder='Estado'
              type={'text'} />
              {/* <Textarea
                onChange={(e)=> {setCargo({ ...usercargo, activo: (e.target.value) }); setValidation(false)}} 
                placeholder='Estado'
              /> */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>saveCargo()} colorScheme={'blue'} autoFocus mr={3}>
              Guardar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CargoAgregarModal;
