import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Items() {
  const [items, setItems] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');
  const [stateQuantidade, setStateQuantidade] = useState('');
  const [stateValor, setStateValor] = useState('');
  const [stateIdProduto, setStateIdProduto] = useState('');
  const [stateidPedido, setStateidPedido] = useState('');

  async function getItems() {
    const apiData = await axios.get('http://localhost:3001/items').then((res) => res.data);
    return setItems(apiData);
  };

  async function deleteItem(id) {
    const result = await axios.delete(`http://localhost:3001/items/${id}`)
      .then((res) => res.status);
    if(result === 204) {
      window.alert('Item removido com sucesso!');
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
    getItems();
  }, []);

  return(
    <>
      <h1>Gerenciar Items</h1>
      <h3>{ `Items registrados: ${ items.length }` }</h3>
      <div>
        <label htmlFor="quantidade">
          Quantidade:
          <input type="number" name="quantidade" />
        </label>

        <label htmlFor="valor">
          Valor:
          <input type="number" name="valor" />
        </label>

        <label htmlFor="idProduto">
          Id do Produto:
          <input type="number" name="idProduto" />
        </label>

        <label htmlFor="idPedido">
          id do Pedido:
          <input type="number" name="idPedido" />
        </label>
        { editModeIsOn 
          ? (
            <button>
              Editar Item
            </button>
          )
          : (
            <button>
              Cadastrar Item
            </button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor</th>
            <th scope="col">Id do Produto</th>
            <th scope="col">Nome do Produto</th>
            <th scope="col">Id Pedido</th>
            <th scope="col">NF do Pedido</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
        { items.length > 0 && items.map((
          { id, quantidade, valor, idProduto, idPedido, produtos, pedidos }) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ quantidade }</td>
              <td>{ valor }</td>
              <td>{ idProduto }</td>
              <td>{ produtos.nome }</td>
              <td>{ idPedido }</td>
              <td>{ pedidos.notafiscal }</td>
              <td><button onClick={ () => enableEditMode(id) }>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Items;
