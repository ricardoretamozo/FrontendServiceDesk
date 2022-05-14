// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import Sedes from "../components/Sedes";
import { tablesSedeData } from "variables/general";

function TablesSede() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Sedes
      title={"Sedes Table"}
      captions={["Id", "Sede", "Direccion", ""]}
      data={tablesSedeData}
      />
    </Flex>
  );
}

export default TablesSede;
