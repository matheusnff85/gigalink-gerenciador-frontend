import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '../Css/main.module.css';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');
  const [stateNome, setStateNome] = useState('');
  const [stateDescricao, setStateDescricao] = useState('');
  const [stateIdFornecedor, setStateIdFornecedor] = useState(undefined);

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
      idFornecedor: stateIdFornecedor === undefined ? undefined : Number(stateIdFornecedor),
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
      idFornecedor: stateIdFornecedor,
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
      setStateIdFornecedor(undefined);
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
    <main className={ styled.mainContainer }>
      <h1 className={ styled.mainTitle }>Gerenciar Produtos</h1>
      <h3 className={ styled.registerCount }>{ `Produtos registrados: ${ produtos.length }` }</h3>
      <div className={ styled.labelsDiv }>
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
              className={ styled.mainEditBtn }
            >
              Editar Produto
            </button>
          )
          : (
            <button
              onClick={ () => saveNewItem() }
              className={ styled.mainRegisterBtn }
            >
              Cadastrar Produto
            </button>
        )}
      </div>
      <table className={ styled.mainTable }>
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
              <td>{ idFornecedor ? idFornecedor : 'Não Cadastrado' }</td>
              <td>{ fornecedores ? fornecedores.nome : 'Não Cadastrado' }</td>
              <td>
                <button 
                  onClick={ () => enableEditMode(id, produtos[index]) }
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

export default Produtos;
