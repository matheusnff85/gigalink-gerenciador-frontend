import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Produtos() {
  const [produtos, setProdutos] = useState([]);

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

  useEffect(() => {
    getProdutos();
  }, []);
  return(
    <>
      <h1>Gerenciar Produtos</h1>
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
        { produtos.length > 0 && produtos.map(({ id, nome, descricao, idFornecedor, fornecedores }) => (
          <tbody>
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ nome }</td>
              <td>{ descricao }</td>
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

export default Produtos;
