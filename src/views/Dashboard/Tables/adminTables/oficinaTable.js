// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import Oficinas from "../components/Oficinas";
import { tablesOficinaData } from "variables/general";

function TablesOficina() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Oficinas
      title={"Oficinas Table"}
      captions={["Id", "Organo", "Oficina", ""]}
      data={tablesOficinaData}
      />
    </Flex>
  );
}

export default TablesOficina;
