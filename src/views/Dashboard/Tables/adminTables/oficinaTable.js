// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import Oficinas from "../components/Oficinas";
import { tablesOficinaData } from "variables/general";
import axios from 'axios';

function TablesOficina() {
  const [oficinas, setOficinas] = useState([]);

  function getOficinas() {
    axios.get('http://localhost:8080/api/oficinas').then(res => {
      const oficinasData = res.data;
      setOficinas(oficinasData);
      console.log(oficinasData)
    }).catch(e =>{
      console.log(e);
    });
  }

  useEffect(() => {
    if(oficinas.length==0){
      getOficinas();
    }
  });
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Oficinas
      title={"Oficinas Table"}
      captions={["Id", "Organo", "Oficina", ""]}
      data={oficinas}
      />
    </Flex>
  );
}

export default TablesOficina;
