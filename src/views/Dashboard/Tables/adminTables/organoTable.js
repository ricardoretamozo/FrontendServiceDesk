// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import Organos from "../components/Organos";
import { tablesOrganoData } from "variables/general";

function TablesOrgano() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Organos
      title={"Organos Table"}
      captions={["Id", "Sede", "Organo", ""]}
      data={tablesOrganoData}
      />
    </Flex>
  );
}

export default TablesOrgano;
