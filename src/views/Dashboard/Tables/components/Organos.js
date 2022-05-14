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
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesOrganoRow from "components/Tables/Admin/TablesOrganoRow";
  import React from "react";
  
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
                <Box p="4">
                    <Button colorScheme="blue" variant={"solid"}>Agregar</Button>
                </Box>
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
                    sede={row.sede.sede}
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
  