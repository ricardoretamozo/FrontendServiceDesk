import React, { useState } from "react";
import axios from 'axios';

const getSedes = async() => {
    axios.get('http://localhost:8080/api/sedes').then((res) => {
        console.log(res.data)
     return res.data;
    }).catch(e =>{
      console.log(e);
    });
}

const postSedes = (props)=> {
    const { sedeNombre, sedeDireccion} = props;
    const data = {
        sede: sedeNombre,
        direccion: sedeDireccion
    }
    let config = {
        headers: {
          'Content-Type': 'application/json',
        }
    }
    console.log(data);
    axios.post('http://localhost:8080/api/sedes', data, config).then(res => {
        console.log(res);
        console.log(res.data);
    }).catch(e =>{
        console.log(e);
    });
}

export{
getSedes,
postSedes
}