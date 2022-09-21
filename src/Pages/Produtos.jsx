import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');
  const [stateNome, setStateNome] = useState('');
  const [stateDescricao, setStateDescricao] = useState('');
  const [stateIdFornecedor, setStateIdFornecedor] = useState('');

  async function getProdutos() {
    const apiData = await axios.get('http://localhost:3001/produtos').then((res) => res.data);
    return setProdutos(apiData);
  };

  async function deleteItem(id) {
    const result = await axios.delete(`http://localhost:3001/produtos/${id}`)
      .then((res) => res.status);
    if(result === 204) {
      window.alert('Produto removido com sucesso!');
      return window.location.reload();
    } else {
      return window.alert('Internal error.');
    }
  };

  async function saveNewItem() {
    const newProduto = {
      nome: stateNome,
      descricao: stateDescricao,
      idFornecedor: Number(stateIdFornecedor),
    };
    try {
      const result = await axios.post('http://localhost:3001/produtos', newProduto)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  async function editItem(id) {
    const newProduto = {
      nome: stateNome,
      descricao: stateDescricao,
      idFornecedor: Number(stateIdFornecedor),
    };
    try {
      const result = await axios.put(`http://localhost:3001/produtos/${id}`, newProduto)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  function enableEditMode(id, produtosObj) {
    if(currentEditId === id) {
      setCurrentEditId('');
      setStateNome('');
      setStateDescricao('');
      setStateIdFornecedor('');
      setEditMode(false);
    } else {
      setCurrentEditId(id);
      setStateNome(produtosObj.nome);
      setStateDescricao(produtosObj.descricao);
      setStateIdFornecedor(produtosObj.idFornecedor);
      setEditMode(true);
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return(
    <>
      <h1>Gerenciar Produtos</h1>
      <h3>{ `Produtos registrados: ${ produtos.length }` }</h3>
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

        <label htmlFor="descricao">
          Descrição:
          <input 
            type="text" 
            id="descricao" 
            value={ stateDescricao }
            onChange={ (event) => setStateDescricao(event.target.value) }
          />
        </label>

        <label htmlFor="idFornecedor">
          Id do Fornecedor:
          <input
            type="number"
            id="idFornecedor"
            value={ stateIdFornecedor }
            onChange={ (event) => setStateIdFornecedor(event.target.value) }
          />
        </label>
        { editModeIsOn 
          ? (
            <button
              onClick={ () => editItem(currentEditId) }
            >
              Editar Produto
            </button>
          )
          : (
            <button
              onClick={ () => saveNewItem() }
            >
              Cadastrar Produto
            </button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Id do Fornecedor</th>
            <th scope="col">Nome do Fornecedor</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
          { produtos.length > 0 && produtos.map(({ id, nome, descricao, idFornecedor, fornecedores }, index) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ nome }</td>
              <td>{ descricao }</td>
              <td>{ idFornecedor }</td>
              <td>{ fornecedores.nome }</td>
              <td><button onClick={ () => enableEditMode(id, produtos[index]) }>Editar</button></td>
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

export default Produtos;
