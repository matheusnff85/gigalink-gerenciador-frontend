import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transportadoras() {
  const [transportadoras, setTransportadoras] = useState([]);

  async function getTransportadoras() {
    const apiData = await axios.get('http://localhost:3001/transportadoras').then((res) => res.data);
    return setTransportadoras(apiData);
  };

  async function deleteItem(id) {
    const result = await axios.delete(`http://localhost:3001/transportadoras/${id}`)
      .then((res) => res.status);
    if(result === 204) {
      window.alert('Transportadora removida com sucesso!');
      return window.location.reload();
    } else {
      return window.alert('Internal error.');
    }
  };

  useEffect(() => {
    getTransportadoras();
  }, []);
  return(
    <>
      <h1>Gerenciar Transportadoras</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        { transportadoras.length > 0 && transportadoras.map(({ id, nome }) => (
          <tbody>
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ nome }</td>
              <td><button>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Transportadoras;
