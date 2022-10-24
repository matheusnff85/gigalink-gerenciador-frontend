import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '../Css/main.module.css';

function Telefones() {
  const [telefones, setTelefones] = useState([]);
  const [listFornecedores, setFornecedores] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');
  const [stateDDD, setStateDDD] = useState('');
  const [stateNumero, setStateNumero] = useState('');
  const [stateReferencia, setStateReferencia] = useState('');
  const [stateIdFornecedor, setStateIdFornecedor] = useState('');

  async function getTelefones() {
    const apiData = await axios.get('http://localhost:3001/telefones').then((res) => res.data);
    return setTelefones(apiData);
  };

  async function getFornecedores() {
    const apiData = await axios.get('http://localhost:3001/fornecedores').then((res) => res.data);
    return setFornecedores(apiData);
  }

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

  async function saveNewItem() {
    const newTelefone = {
      ddd: stateDDD,
      numero: stateNumero,
      referencia: stateReferencia,
      idFornecedor: Number(stateIdFornecedor),
    };
    try {
      const result = await axios.post('http://localhost:3001/telefones', newTelefone)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  async function editItem(id) {
    const newTelefone = {
      ddd: stateDDD,
      numero: stateNumero,
      referencia: stateReferencia,
      idFornecedor: Number(stateIdFornecedor),
    };
    try {
      const result = await axios.put(`http://localhost:3001/telefones/${id}`, newTelefone)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  function enableEditMode(id, telefonesObj) {
    if(currentEditId === id) {
      setCurrentEditId('');
      setStateDDD('');
      setStateNumero('');
      setStateReferencia('');
      setStateIdFornecedor('');
      setEditMode(false);
    } else {
      setCurrentEditId(id);
      setStateDDD(telefonesObj.ddd);
      setStateNumero(telefonesObj.numero);
      setStateReferencia(telefonesObj.referencia);
      setStateIdFornecedor(telefonesObj.idFornecedor);
      setEditMode(true);
    }
  }

  useEffect(() => {
    getTelefones();
    getFornecedores();
  }, []);

  return(
    <main className={ styled.mainContainer }>
      <h1 className={ styled.mainTitle }>Gerenciar Telefones</h1>
      <h3 className={ styled.registerCount }>{ `Telefones registrados: ${ telefones.length }.` }</h3>
      <div className={ styled.labelsDiv }>
        <label htmlFor="ddd">
          DDD:
          <input
            type="text"
            id="ddd"
            value={ stateDDD }
            onChange={ (event) => setStateDDD(event.target.value) }
          />
        </label>

        <label htmlFor="numero">
          Número:
          <input
            type="text"
            id="numero"
            value={  stateNumero }
            onChange={ (event) => setStateNumero(event.target.value) }
          />
        </label>

        <label htmlFor="referencia">
          Referência:
          <input
            type="text"
            id="referencia"
            value={ stateReferencia }
            onChange={ (event) => setStateReferencia(event.target.value) }
          />
        </label>

        <label htmlFor="idFornecedor">
          Fornecedor:
          <select
            name="idFornecedor" 
            id="idFornecedor"
            onChange={ (event) => setStateIdFornecedor(event.target.value) }
          >
            {listFornecedores.length > 0 && listFornecedores.map((fornecedor, index) => (
              <option
                key={ index }
                value={ fornecedor.id }
              >
                { fornecedor.nome }
              </option>
            ))}
          </select>
        </label>
        { editModeIsOn 
          ? (
            <button
              onClick={ () => editItem(currentEditId) }
              className={ styled.mainEditBtn }
            >
              Editar Telefone
            </button>
          )
          : (
            <button
              onClick={ () => saveNewItem() }
              className={ styled.mainRegisterBtn }
            >
              Cadastrar Telefone
            </button>
        )}
      </div>
      <table className={ styled.mainTable }>
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
          { id, ddd, numero, referencia, idFornecedor, fornecedores }, index) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ `${ddd} ${numero}` }</td>
              <td>{ referencia }</td>
              <td>{ idFornecedor }</td>
              <td>{ fornecedores.nome }</td>
              <td>
                <button
                  onClick={ () => enableEditMode(id, telefones[index]) }
                  className={ styled.tableEditBtn }
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  onClick={ () => deleteItem(id) }
                  className={ styled.tableDeleteBtn }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <h4>Desenvolvido por <a href='https://www.linkedin.com/in/matheus-marinhodsp/'>Matheus Marinho</a></h4>
      </footer>
    </main>
  );
}

export default Telefones;
