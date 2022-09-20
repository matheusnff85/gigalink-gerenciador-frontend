import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  async function getPedidos() {
    const apiData = await axios.get('http://localhost:3001/pedidos').then((res) => res.data);
    return setPedidos(apiData);
  };

  useEffect(() => {
    getPedidos();
  }, []);
  return(
    <>
      <h1>Gerenciar Pedidos</h1>
    </>
  );
}

export default Pedidos;
