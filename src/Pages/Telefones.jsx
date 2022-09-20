import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Telefones() {
  const [telefones, setTelefones] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');

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

  function enableEditMode(id) {
    if(currentEditId === id) {
      setCurrentEditId('');
      setEditMode(false);
    } else {
      setCurrentEditId(id);
      setEditMode(true);
    }
  }

  useEffect(() => {
    getTelefones();
  }, []);

  return(
    <>
      <h1>Gerenciar Telefones</h1>
      <h3>{ `Telefones registrados: ${ telefones.length }.` }</h3>
      <div>
        <label htmlFor="ddd">
          DDD:
          <input type="text" id="ddd" />
        </label>

        <label htmlFor="numero">
          Número:
          <input type="text" id="numero" />
        </label>

        <label htmlFor="referencia">
          Referência:
          <input type="text" id="referencia" />
        </label>

        <label htmlFor="idFornecedor">
          Id do Fornecedor:
          <input type="number" id="idFornecedor" />
        </label>
        { editModeIsOn 
          ? (
            <button>
              Editar Telefone
            </button>
          )
          : (
            <button>
              Cadastrar Telefone
            </button>
        )}
      </div>
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
        <tbody>
        { telefones.length > 0 && telefones.map((
          { id, ddd, numero, referencia, idFornecedor, fornecedores }) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ `${ddd} ${numero}` }</td>
              <td>{ referencia }</td>
              <td>{ idFornecedor }</td>
              <td>{ fornecedores.nome }</td>
              <td><button onClick={ () => enableEditMode(id) }>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Telefones;
