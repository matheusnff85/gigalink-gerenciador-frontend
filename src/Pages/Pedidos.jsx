import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');

  async function getPedidos() {
    const apiData = await axios.get('http://localhost:3001/pedidos').then((res) => res.data);
    return setPedidos(apiData);
  };

  async function deleteItem(id) {
    const result = await axios.delete(`http://localhost:3001/pedidos/${id}`)
      .then((res) => res.status);
    if(result === 204) {
      window.alert('Pedido removido com sucesso!');
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
    getPedidos();
  }, []);

  return(
    <>
      <h1>Gerenciar Pedidos</h1>
      <h3>{ `Pedidos registrados: ${ pedidos.length }` }</h3>
      <div>
        <label htmlFor="">
          Nota Fiscal:
          <input type="text" id="" />
        </label>

        <label htmlFor="">
          Valor do Frete:
          <input type="number" id="" />
        </label>

        <label htmlFor="">
          Desconto:
          <input type="number" id="" />
        </label>

        <label htmlFor="">
          Valor Total:
          <input type="number" id="" />
        </label>

        <label htmlFor="">
          idTransportadora: 
          <input type="number" id="" />
        </label>
        { editModeIsOn 
          ? (
            <button>
              Editar Pedido
            </button>
          )
          : (
            <button>
              Cadastrar Pedido
            </button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Data/Hora</th>
            <th scope="col">Nota Fiscal</th>
            <th scope="col">Valor do Frete</th>
            <th scope="col">Desconto</th>
            <th scope="col">Valor Total</th>
            <th scope="col">Id da Transp.</th>
            <th scope="col">Nome da Transp.</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
        { pedidos.length > 0 && pedidos.map((
          { id, datahora, notafiscal, valorfrete, desconto, valortotal, idTransportadora, transportadoras }) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ datahora }</td>
              <td>{ notafiscal }</td>
              <td>{ valorfrete }</td>
              <td>{ desconto }</td>
              <td>{ valortotal }</td>
              <td>{ idTransportadora }</td>
              <td>{ transportadoras.nome }</td>
              <td><button onClick={ () => enableEditMode(id) }>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Pedidos;
