import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);

  async function getFornecedores() {
    const apiData = await axios.get('http://localhost:3001/fornecedores').then((res) => res.data);
    return setFornecedores(apiData);
  };

  useEffect(() => {
    getFornecedores();
  }, []);
  return(
    <>
      <h1>Gerenciar Fornecedores</h1>
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
        { fornecedores.length > 0 && fornecedores.map((
          { id, nome, descricao, cidade, endereco, bairro, numero, emails, telefones, produtos }) => (
          <tbody>
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
              <td><button>Editar</button></td>
              <td><button>Excluir</button></td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Fornecedores;
