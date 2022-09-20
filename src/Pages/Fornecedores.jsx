import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);

  async function getFornecedores() {
    const apiData = await axios.get('http://localhost:3001/fornecedores').then((res) => res.data);
    return setFornecedores(apiData);
  };

  useEffect(() => {
    getFornecedores();
  }, []);
  return(
    <>
      <h1>Gerenciar Fornecedores</h1>
    </>
  );
}

export default Fornecedores;
