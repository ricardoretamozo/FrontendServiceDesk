// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import Sedes from "../components/Sedes";
import { tablesSedeData } from "variables/general";
import axios from "axios";

function TablesSede() {
  const [sedes, setSedes] = useState([]);

  function getSedes() {
    axios.get('http://localhost:8080/api/sedes').then(res => {
      const sedesData = res.data;
      setSedes(sedesData);
    }).catch(e =>{
      console.log(e);
    });
  }

  useEffect(() => {
    if(sedes.length==0){
      getSedes();
    }
  });
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Sedes
        title={"Sedes Table"}
        captions={["Id", "Sede", "Direccion", ""]}
        data={sedes}
        />
    </Flex>
  );
}

export default TablesSede;
