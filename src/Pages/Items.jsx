import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '../Css/main.module.css';

function Items() {
  const [items, setItems] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');
  const [stateQuantidade, setStateQuantidade] = useState('');
  const [stateValor, setStateValor] = useState('');
  const [stateIdProduto, setStateIdProduto] = useState(undefined);
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

  async function saveNewItem() {
    const newItem = {
      quantidade: Number(stateQuantidade),
      valor: Number(stateValor),
      idProduto: stateIdProduto === undefined ? undefined : Number(stateIdProduto),
      idPedido: Number(stateidPedido),
    };
    try {
      const result = await axios.post('http://localhost:3001/items', newItem)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  async function editItem(id) {
    const newItem = {
      quantidade: Number(stateQuantidade),
      valor: Number(stateValor),
      idProduto: Number(stateIdProduto),
      idPedido: Number(stateidPedido),
    };
    try {
      const result = await axios.put(`http://localhost:3001/items/${id}`, newItem)
        .then((res) => res);
      window.alert(`${result.status} - ${result.statusText}`);
      window.location.reload();
    } catch (error) {
      window.alert(`Erro:${error.response.status} - ${error.response.data.message}`);
    }
  };

  function enableEditMode(id, itemsObj) {
    if(currentEditId === id) {
      setCurrentEditId('');
      setStateQuantidade('');
      setStateValor('');
      setStateIdProduto(undefined);
      setStateidPedido('');
      setEditMode(false);
    } else {
      setCurrentEditId(id);
      setStateQuantidade(itemsObj.quantidade);
      setStateValor(itemsObj.valor);
      setStateIdProduto(itemsObj.idProduto);
      setStateidPedido(itemsObj.idPedido);
      setEditMode(true);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return(
    <main className={ styled.mainContainer }>
      <h1 className={ styled.mainTitle }>Gerenciar Items</h1>
      <h3 className={ styled.registerCount }>{ `Items registrados: ${ items.length }` }</h3>
      <div className={ styled.labelsDiv }>
        <label htmlFor="quantidade">
          Quantidade:
          <input
            type="number"
            name="quantidade"
            value={ stateQuantidade }
            onChange={ (event) => setStateQuantidade(event.target.value) }
          />
        </label>

        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            name="valor"
            value={ stateValor }
            onChange={ (event) => setStateValor(event.target.value) }
          />
        </label>

        <label htmlFor="idProduto">
          Id do Produto:
          <input
            type="number"
            name="idProduto"
            value={ stateIdProduto }
            onChange={ (event) => setStateIdProduto(event.target.value) }
          />
        </label>

        <label htmlFor="idPedido">
          id do Pedido:
          <input
            type="number"
            name="idPedido"
            value={ stateidPedido }
            onChange={ (event) => setStateidPedido(event.target.value) }
          />
        </label>
        { editModeIsOn 
          ? (
            <button
              onClick={ () => editItem(currentEditId) }
              className={ styled.mainEditBtn }
            >
              Editar Item
            </button>
          )
          : (
            <button
              onClick={ () => saveNewItem() }
              className={ styled.mainRegisterBtn }
            >
              Cadastrar Item
            </button>
        )}
      </div>
      <table className={ styled.mainTable }>
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
          { id, quantidade, valor, idProduto, idPedido, produtos, pedidos }, index) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ quantidade }</td>
              <td>{ valor }</td>
              <td>{ idProduto ? idProduto : 'Não Cadastrado' }</td>
              <td>{ produtos ? produtos.nome : 'Não Cadastrado' }</td>
              <td>{ idPedido }</td>
              <td>{ pedidos.notafiscal }</td>
              <td>
                <button 
                  onClick={ () => enableEditMode(id, items[index]) }
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

export default Items;
