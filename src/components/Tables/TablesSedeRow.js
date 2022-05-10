import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
    Button,
    Flex,
    Stack,
    Td,
    Text,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";
  
  function TablesSedeRow(props) {
    const { id, sede, direccion } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
  
    return (
      <Tr>
        <Td minWidth={{ sm: "100px" }} pl="0px">
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {id}
          </Text>
        </Td>
  
        <Td>
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {sede}
            </Text>
          </Flex>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {direccion}
          </Text>
        </Td>
        <Td>
            <Stack direction="row" spacing={4}>
                <Button leftIcon={<SearchIcon />}  colorScheme="blue" variant="solid"/>

                <Button leftIcon={<EditIcon />}  colorScheme="yellow" variant="solid">
                    EDITAR
                </Button>s
                <Button leftIcon={<DeleteIcon />} colorScheme="red" variant="solid">
                    ELIMINAR
                </Button>
            </Stack>
        </Td>
      </Tr>
    );
  }
  
  export default TablesSedeRow;
  