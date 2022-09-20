import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Emails() {
  const [emails, setEmails] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');

  async function getEmails() {
    const apiData = await axios.get('http://localhost:3001/emails').then((res) => res.data);
    return setEmails(apiData);
  };

  async function deleteItem(id) {
    const result = await axios.delete(`http://localhost:3001/emails/${id}`)
      .then((res) => res.status);
    if(result === 204) {
      window.alert('Email removido com sucesso!');
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
    getEmails();
  }, []);

  return(
    <>
      <h1>Gerenciar Emails</h1>
      <h4>{ `Emails registrados: ${ emails.length }.` }</h4>
      <div>
        <label htmlFor="email">
          Email:
          <input type="text" name="email" />
        </label>

        <label htmlFor="referencia">
          Referência:
          <input type="text" name="referencia" />
        </label>

        <label htmlFor="idFornecedor">
          Id do Fornecedor:
          <input type="text" name="idFornecedor" />
        </label>
        { editModeIsOn 
          ? (
            <button>
              Editar Email
            </button>
          )
          : (
            <button>
              Cadastrar Email
            </button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">Referência</th>
            <th scope="col">Id do Fornecedor</th>
            <th scope="col">Nome do Fornecedor</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        { emails.length > 0 && emails.map(({ id, email, referencia, idFornecedor, fornecedores }) => (
          <tbody>
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ email }</td>
              <td>{ referencia }</td>
              <td>{ idFornecedor }</td>
              <td>{ fornecedores.nome }</td>
              <td><button onClick={ () => enableEditMode(id) }>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Emails;
