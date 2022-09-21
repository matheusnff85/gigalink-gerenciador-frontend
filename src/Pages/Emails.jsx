import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '../Css/main.module.css';

function Emails() {
  const [emails, setEmails] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');
  const [stateEmail, setStateEmail] = useState('');
  const [stateReferencia, setStateReferencia] = useState('');
  const [stateIdFornecedor, setStateIdFornecedor] = useState('');

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

  async function saveNewItem() {
    const newEmail = { 
      email: stateEmail,
      referencia: stateReferencia,
      idFornecedor: Number(stateIdFornecedor),
    };
    try {
      const result = await axios.post('http://localhost:3001/emails', newEmail)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  async function editItem(id) {
    const newEmail = { 
      email: stateEmail,
      referencia: stateReferencia,
      idFornecedor: Number(stateIdFornecedor),
    };
    try {
      const result = await axios.put(`http://localhost:3001/emails/${id}`, newEmail)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  function enableEditMode(id, emailObj) {
    if(currentEditId === id) {
      setCurrentEditId('');
      setStateEmail('');
      setStateReferencia('');
      setStateIdFornecedor('');
      setEditMode(false);
    } else {
      setCurrentEditId(id);
      setStateEmail(emailObj.email);
      setStateReferencia(emailObj.referencia);
      setStateIdFornecedor(emailObj.idFornecedor);
      setEditMode(true);
    }
  };

  useEffect(() => {
    getEmails();
  }, []);

  return(
    <main className={ styled.mainContainer }>
      <h1 className={ styled.mainTitle }>Gerenciar Emails</h1>
      <h4 className={ styled.registerCount }>{ `Emails registrados: ${ emails.length }.` }</h4>
      <div className={ styled.labelsDiv }>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            value={ stateEmail }
            onChange={ (event) => setStateEmail(event.target.value) }
          />
        </label>

        <label htmlFor="referencia">
          Referência:
          <input
            type="text"
            name="referencia"
            value={ stateReferencia }
            onChange={ (event) => setStateReferencia(event.target.value) }
          />
        </label>

        <label htmlFor="idFornecedor">
          Id do Fornecedor:
          <input
            type="text"
            name="idFornecedor"
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
              Editar Email
            </button>
          )
          : (
            <button
              onClick={ () => saveNewItem() }
              className={ styled.mainRegisterBtn }
            >
              Cadastrar Email
            </button>
        )}
      </div>
      <table className={ styled.mainTable }>
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
        <tbody>
        { emails.length > 0 && emails.map(({ id, email, referencia, idFornecedor, fornecedores }, index) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ email }</td>
              <td>{ referencia }</td>
              <td>{ idFornecedor }</td>
              <td>{ fornecedores.nome }</td>
              <td>
                <button 
                onClick={ () => enableEditMode(id, emails[index]) }
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

export default Emails;
