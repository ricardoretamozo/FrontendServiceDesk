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
  Select,
  HStack,
} from "@chakra-ui/react";

// import actions
import { createPersona } from "../../../../actions/personas";
import { listPerfil } from "../../../../actions/perfiles";

import {useDispatch, useSelector} from 'react-redux'
import React, { useState, useEffect } from "react";

const PersonasAgregarModal =(props) => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  }

  const handleCloseModal = () => {
    setOpenCreate(false);
  };
  
  const initialPerfil = {
    idPerfilPersona: null,
  }

  const [perfiles, setPerfiles] = useState(initialPerfil);
  
  const initialPersona = {
    id: null,
    nombre: "",
    apellido: "",
    usuario: "",
    dni: "",
    password: "",
    fecha: null,
    sexo: "",
    activo: "",
    perfilPersona: {
      idPerfilPersona: null,
    }
  }


  const [persona, setPersona] = useState(initialPersona);

  const savePersona = () => {
    const {nombre,apellido,usuario,dni,password,fecha,sexo,activo,perfilPersona} = persona
    const {idPerfilPersona} = perfiles

    dispatch(createPersona(nombre,apellido,usuario,dni,password,fecha,sexo,activo,perfilPersona))
    .then(data => {
      setPersona({
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        usuario: data.usuario,
        dni: data.dni,
        password: data.password,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: data.perfilPersona.idPerfilPersona,
      })
      handleCloseModal(true);
      //props.history.push('/personas')
      console.log(persona);
    }).catch(e => {
        console.log('No se pudo crear la Persona!', { variant: 'error' });
        handleCloseModal(true);
        console.log(e);
      });

  }

  useEffect(() => {
    dispatch(listPerfil());
  },[dispatch]);

  const perfil = useSelector(store => store.perfiles);

  const data1 = perfil.map((user) => {
    return{
      idPerfilPersona: user.idPerfilPersona,
      perfil: user.perfil,
      descripcion: user.descripcion,
    }
  })
  //console.log(data1);

  return (
    <>
      <Button colorScheme={'blue'} onClick={handleClickOpenCreate}>Agregar</Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nueva Persona</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <HStack spacing={'10px'}>
              <FormControl>
                <FormLabel>Nombres</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, nombre: e.target.value})}
                placeholder='Nombres'
                type={'text'} />
              </FormControl>
              <FormControl>
                <FormLabel>Apellidos</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, apellido: e.target.value})}
                placeholder='Apellidos'
                type={'text'} />
              </FormControl>
            </HStack>
            <HStack spacing={'10px'} mt={'20px'}>
              <FormControl>
                <FormLabel>DNI</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, dni: e.target.value})}
                placeholder='DNI'
                type={'text'} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, password: e.target.value})}
                type={'password'}
                placeholder='minimo 8 caracteres' />
              </FormControl>
            </HStack>
          
            <FormControl mt={4}>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input
                    placeholder='Fecha de Nacimiento'
                    type={'date'}
                    onChange={(e)=> setPersona({ ...persona, fecha: e.target.value})} />
                    {/* onChange={(e)=> {setPersona({ ...persona, fecha: (e.target.value) }); setValidation(false)}}  /> */}
            </FormControl>

            <FormControl>
                <FormLabel>Usuario</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, usuario: e.target.value})}
                type={'text'}
                placeholder='deve tener 8 caracteres' />
            </FormControl>

            <HStack spacing={'10px'} mt={'20px'}>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, activo: e.target.value})}
                type={'text'}
                placeholder='A o I' />              
              </FormControl>
              <FormControl>
                <FormLabel>Sexo</FormLabel>
                <Input 
                onChange={(e)=> setPersona({ ...persona, sexo: e.target.value})}
                type={'text'}
                placeholder='M o F' />              
              </FormControl>
            </HStack>
            
            <FormControl mt={4}>
              <FormLabel>Perfil Persona</FormLabel>
              {/* <Select placeholder='Select option' onChange={(e)=> setPersona({...persona, perfilPersona: e.target.value})}>
                  {data1.map((item, idx) => (
                    <option value={item.idPerfilPersona} key={idx}>{item.perfil}</option>
                  ))}
              </Select> */}
              <Input
              onChange={(e)=> setPersona({ ...persona, perfilPersona : e.target.value})}
              placeholder='ID'
              type={'number'}/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>savePersona()} colorScheme={'blue'} mr={3}>
              Guardar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PersonasAgregarModal;
