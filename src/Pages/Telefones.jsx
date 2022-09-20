import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Telefones() {
  const [telefones, setTelefones] = useState([]);

  async function getTelefones() {
    const apiData = await axios.get('http://localhost:3001/telefones').then((res) => res.data);
    return setTelefones(apiData);
  };

  useEffect(() => {
    getTelefones();
  }, []);
  return(
    <>
      <h1>Gerenciar Telefones</h1>
    </>
  );
}

export default Telefones;
