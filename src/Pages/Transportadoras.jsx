import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transportadoras() {
  const [transportadoras, setTransportadoras] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');
  const [stateNome, setStateNome] = useState('');

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

  async function saveNewItem() {
    const newTransportadora = {
      nome: stateNome,
    };
    try {
      const result = await axios.post('http://localhost:3001/transportadoras', newTransportadora)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  async function editItem(id) {
    const newTransportadora = {
      nome: stateNome,
    }
    try {
      const result = await axios.put(`http://localhost:3001/transportadoras/${id}`, newTransportadora)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  function enableEditMode(id, nome) {
    if(currentEditId === id) {
      setCurrentEditId('');
      setStateNome('');
      setEditMode(false);
    } else {
      setCurrentEditId(id);
      setStateNome(nome);
      setEditMode(true);
    }
  }

  useEffect(() => {
    getTransportadoras();
  }, []);

  return(
    <>
      <h1>Gerenciar Transportadoras</h1>
      <h3>{ `Transportadoras cadastradas: ${ transportadoras.length }` }</h3>
      <div>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            value={ stateNome }
            onChange={ (event) => setStateNome(event.target.value) }
          />
        </label>
        { editModeIsOn 
          ? (
            <button
              onClick={ () => editItem(currentEditId) }
            >
              Editar Transportadora
            </button>
          )
          : (
            <button
              onClick={ () => saveNewItem() }
            >
              Cadastrar Transportadora
            </button>
          )}
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
        { transportadoras.length > 0 && transportadoras.map(({ id, nome }) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ nome }</td>
              <td><button onClick={ () => enableEditMode(id, nome) }>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <h4>Desenvolvido por <a href='https://www.linkedin.com/in/matheus-marinhodsp/'>Matheus Marinho</a></h4>
      </footer>
    </>
  );
}

export default Transportadoras;
