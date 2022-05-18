// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Organos from "../components/Organos";
import { tablesOrganoData } from "variables/general";
import axios from "axios";


function TablesOrgano() {
  const [organos, setOrganos] = useState([]);

  function getOrganos() {
    axios.get('http://localhost:8080/api/organos').then(res => {
      const organosData = res.data;
      setOrganos(organosData);
      //console.log(organosData)
    }).catch(e =>{
      console.log(e);
    });
  }

  useEffect(() => {
    if(organos.length==0){
      getOrganos();
    }
  });
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Organos
      title={"Organos Table"}
      captions={["Id", "Sede", "Organo", ""]}
      data={organos}
      />
    </Flex>
  );
}

export default TablesOrgano;
