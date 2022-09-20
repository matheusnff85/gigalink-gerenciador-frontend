import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');

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
    getProdutos();
  }, []);

  return(
    <>
      <h1>Gerenciar Produtos</h1>
      <h3>{ `Produtos registrados: ${ produtos.length }` }</h3>
      <div>
        <label htmlFor="nome">
          Nome:
          <input type="text" id="nome" />
        </label>

        <label htmlFor="descricao">
          Descrição:
          <input type="text" id="descricao" />
        </label>

        <label htmlFor="idFornecedor">
          Id do Fornecedor:
          <input type="number" id="idFornecedor" />
        </label>
        { editModeIsOn 
          ? (
            <button>
              Editar Produto
            </button>
          )
          : (
            <button>
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
          { produtos.length > 0 && produtos.map(({ id, nome, descricao, idFornecedor, fornecedores }) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ nome }</td>
              <td>{ descricao }</td>
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

export default Produtos;
