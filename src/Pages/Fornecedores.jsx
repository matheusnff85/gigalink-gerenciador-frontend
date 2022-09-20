import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');

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
    getFornecedores();
  }, []);

  return(
    <>
      <h1>Gerenciar Fornecedores</h1>
      <h3>{ `Fornecedores cadastrados: ${ fornecedores.length }.`}</h3>
      <div>
        <label htmlFor="nome">
          Nome:
          <input type="text" name="nome" />
        </label>

        <label htmlFor="descricao">
          Descrição:
          <input type="text" name="descricao" />
        </label>

        <label htmlFor="cidade">
          Cidade:
          <input type="text" name="cidade" />
        </label>

        <label htmlFor="endereco">
          Endereço:
          <input type="text" name="endereco" />
        </label>

        <label htmlFor="bairro">
          Bairro:
          <input type="text" name="bairro" />
        </label>

        <label htmlFor="numero">
          Número:
          <input type="number" name="numero" />
        </label>
        { editModeIsOn 
          ? (
            <button>
              Editar Fornecedor
            </button>
          )
          : (
            <button>
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
              <td><button onClick={ () => enableEditMode(id) }>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Fornecedores;
