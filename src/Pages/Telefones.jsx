import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Telefones() {
  const [telefones, setTelefones] = useState([]);

  async function getTelefones() {
    const apiData = await axios.get('http://localhost:3001/telefones').then((res) => res.data);
    return setTelefones(apiData);
  };

  async function deleteItem(id) {
    const result = await axios.delete(`http://localhost:3001/telefones/${id}`)
      .then((res) => res.status);
    if(result === 204) {
      window.alert('Telefone removido com sucesso!');
      return window.location.reload();
    } else {
      return window.alert('Internal error.');
    }
  };

  useEffect(() => {
    getTelefones();
  }, []);
  return(
    <>
      <h1>Gerenciar Telefones</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">DDD + Número</th>
            <th scope="col">Referência</th>
            <th scope="col">Id do Fornecedor</th>
            <th scope="col">Nome do Fornecedor</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        { telefones.length > 0 && telefones.map((
          { id, ddd, numero, referencia, idFornecedor, fornecedores }) => (
          <tbody>
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ `${ddd} ${numero}` }</td>
              <td>{ referencia }</td>
              <td>{ idFornecedor }</td>
              <td>{ fornecedores.nome }</td>
              <td><button>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Telefones;
