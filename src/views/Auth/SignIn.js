import React,{useState} from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/poderjudicial.jpg";
import axios from "axios";
import qs from "qs";

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue("#9a1413", "white");
  const textColor = useColorModeValue("black.400", "white");
  const [dni, dniSet] = useState("");
  const [password, passwordSet] = useState("");

  function manejadorSubmit(e) {
    e.preventDesafult();
  }

  const login = () =>{
    console.log(dni);
    /*const data = {
      'dni': dni,
      'password': password 
    }
    let config = {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
    console.log(config);
    axios.post('http://localhost:8080/api/login',data,config).then(res => {
      console.log(res);
      console.log(res.data);
    }).catch(e => {
      console.log(e);
    })*/
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/login',
      data: qs.stringify({
        'dni': dni,
        'password': password
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(res => {
      console.log(res);
      console.log(res.data);
    }).catch(e => {
      console.log(e);
    })
  }

 



  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="65px" mb="15px">
              Bienvenido
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Ingresa tu DNI y tu contraseña.
            </Text>
            <FormControl onSubmit={manejadorSubmit}>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                DNI
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="DNI"
                size="lg"
                focusBorderColor="#9a1413"
                id="field-1"
                name="dni"
                onChange={(e)=>{dniSet(e.target.value); console.log(dni)}}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Contraseña
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                placeholder="Contraseña"
                size="lg"
                focusBorderColor="#9a1413"
                id="field-2"
                name="password"
                onChange={(e)=>{passwordSet(e.target.value)}}
              />
              <Button
                fontSize="15px"
                type="submit"
                bg="#9a1413"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{
                  bg: "black",
                }}
                _active={{
                  bg: "teal.400",
                }}
                onClick={login}
              >
                Iniciar Sesión
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Usted no esta registrado?
                <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                  Registrate
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
