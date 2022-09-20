import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  async function getProdutos() {
    const apiData = await axios.get('http://localhost:3001/produtos').then((res) => res.data);
    return setProdutos(apiData);
  };

  useEffect(() => {
    getProdutos();
  }, []);
  return(
    <>
      <h1>Gerenciar Produtos</h1>
    </>
  );
}

export default Produtos;
