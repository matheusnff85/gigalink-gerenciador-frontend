import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    }
    try {
      const result = await axios.post('http://localhost:3001/fornecedores', newFornecedor)
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
    <>
      <h1>Gerenciar Fornecedores</h1>
      <h3>{ `Fornecedores cadastrados: ${ fornecedores.length }.`}</h3>
      <div>
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
          Descrição:
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
          Endereço:
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
          Número:
          <input
            type="number"
            name="numero"
            value={ stateNumero }
            onChange={ (event) => setStateNumero(event.target.value) }
          />
        </label>
        { editModeIsOn 
          ? (
            <button>
              Editar Fornecedor
            </button>
          )
          : (
            <button
              onClick={ () => saveNewItem() }
            >
              Cadastrar Fornecedor
            </button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Cidade</th>
            <th scope="col">Endereço</th>
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
              <td><button onClick={ () => enableEditMode(id, fornecedores[index]) }>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Fornecedores;
