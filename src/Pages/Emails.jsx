import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Emails() {
  const [emails, setEmails] = useState([]);

  async function getEmails() {
    const apiData = await axios.get('http://localhost:3001/emails').then((res) => res.data);
    return setEmails(apiData);
  };

  useEffect(() => {
    getEmails();
  }, []);

  return(
    <>
      <h1>Gerenciar Emails</h1>
      <h4>{ `Quantidade de emails registrados: ${ emails.length }` }</h4>
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
              <td><button>Editar</button></td>
              <td><button>Excluir</button></td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Emails;
