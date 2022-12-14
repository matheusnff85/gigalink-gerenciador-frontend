import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '../Css/main.module.css';

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');
  const [stateNome, setStateNome] = useState('');
  const [stateDescricao, setStateDescricao] = useState('');
  const [stateCidade, setStateCidade] = useState('');
  const [stateEndereco, setStateEndereco] = useState('');
  const [stateBairro, setStateBairro] = useState('');
  const [stateNumero, setStateNumero] = useState('');

  async function getFornecedores() {
    const apiData = await axios.get('http://localhost:3001/fornecedores').then((res) => res.data);
    return setFornecedores(apiData);
  };

  async function deleteItem(id) {
    const result = await axios.delete(`http://localhost:3001/fornecedores/${id}`)
      .then((res) => res.status);
    if(result === 204) {
      window.alert('Fornecedor removido com sucesso!');
      return window.location.reload();
    } else {
      return window.alert('Internal error.');
    }
  };

  async function saveNewItem() {
    const newFornecedor = {
      nome: stateNome,
      descricao: stateDescricao,
      cidade: stateCidade,
      endereco: stateEndereco,
      bairro: stateBairro,
      numero: Number(stateNumero),
    };
    try {
      const result = await axios.post('http://localhost:3001/fornecedores', newFornecedor)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  async function editItem(id) {
    const newFornecedor = {
      nome: stateNome,
      descricao: stateDescricao,
      cidade: stateCidade,
      endereco: stateEndereco,
      bairro: stateBairro,
      numero: Number(stateNumero),
    };
    try {
      const result = await axios.put(`http://localhost:3001/fornecedores/${id}`, newFornecedor)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  function enableEditMode(id, fornecedorObj) {
    if(currentEditId === id) {
      setCurrentEditId('');
      setStateNome('');
      setStateDescricao('');
      setStateCidade('');
      setStateEndereco('');
      setStateBairro('');
      setStateNumero('');
      setEditMode(false);
    } else {
      setCurrentEditId(id);
      setStateNome(fornecedorObj.nome);
      setStateDescricao(fornecedorObj.descricao);
      setStateCidade(fornecedorObj.cidade);
      setStateEndereco(fornecedorObj.endereco);
      setStateBairro(fornecedorObj.bairro);
      setStateNumero(fornecedorObj.numero);
      setEditMode(true);
    }
  };

  useEffect(() => {
    getFornecedores();
  }, []);

  return(
    <main className={ styled.mainContainer }>
      <h1 className={ styled.mainTitle }>Gerenciar Fornecedores</h1>
      <h3 className={ styled.registerCount }>{ `Fornecedores cadastrados: ${ fornecedores.length }.`}</h3>
      <div className={ styled.labelsDiv }>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            name="nome"
            value={ stateNome }
            onChange={ (event) => setStateNome(event.target.value) }
          />
        </label>

        <label htmlFor="descricao">
          Descri????o:
          <input
            type="text"
            name="descricao"
            value={ stateDescricao }
            onChange={ (event) => setStateDescricao(event.target.value) }
          />
        </label>

        <label htmlFor="cidade">
          Cidade:
          <input
            type="text"
            name="cidade"
            value={ stateCidade }
            onChange={ (event) => setStateCidade(event.target.value) }
          />
        </label>

        <label htmlFor="endereco">
          Endere??o:
          <input
            type="text"
            name="endereco"
            value={ stateEndereco }
            onChange={ (event) => setStateEndereco(event.target.value) }
          />
        </label>

        <label htmlFor="bairro">
          Bairro:
          <input
            type="text"
            name="bairro"
            value={ stateBairro }
            onChange={ (event) => setStateBairro(event.target.value) }
          />
        </label>

        <label htmlFor="numero">
          N??mero:
          <input
            type="number"
            name="numero"
            value={ stateNumero }
            onChange={ (event) => setStateNumero(event.target.value) }
          />
        </label>
        { editModeIsOn 
          ? (
            <button
              onClick={ () => editItem(currentEditId) }
              className={ styled.mainEditBtn }
            >
              Editar Fornecedor
            </button>
          )
          : (
            <button
              onClick={ () => saveNewItem() }
              className={ styled.mainRegisterBtn }
            >
              Cadastrar Fornecedor
            </button>
        )}
      </div>
      <table className={ styled.mainTable }>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descri????o</th>
            <th scope="col">Cidade</th>
            <th scope="col">Endere??o</th>
            <th scope="col">Bairro</th>
            <th scope="col">Numero</th>
            <th scope="col">Qtd. Emails</th>
            <th scope="col">Qtd. Telefones</th>
            <th scope="col">Qtd. Produtos</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
        { fornecedores.length > 0 && fornecedores.map((
          { id, nome, descricao, cidade, endereco, bairro, numero, emails, telefones, produtos }, index) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ nome }</td>
              <td>{ descricao }</td>
              <td>{ cidade }</td>
              <td>{ endereco }</td>
              <td>{ bairro }</td>
              <td>{ numero }</td>
              <td>{ emails.length }</td>
              <td>{ telefones.length }</td>
              <td>{ produtos.length }</td>
              <td>
                <button 
                  onClick={ () => enableEditMode(id, fornecedores[index]) }
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

export default Fornecedores;
