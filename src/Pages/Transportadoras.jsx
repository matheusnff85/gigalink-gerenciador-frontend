import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transportadoras() {
  const [transportadoras, setTransportadoras] = useState([]);

  async function getTransportadoras() {
    const apiData = await axios.get('http://localhost:3001/transportadoras').then((res) => res.data);
    return setTransportadoras(apiData);
  };

  useEffect(() => {
    getTransportadoras();
  }, []);
  return(
    <>
      <h1>Gerenciar Transportadoras</h1>
    </>
  );
}

export default Transportadoras;
