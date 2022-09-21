import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [editModeIsOn, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState('');
  const [stateNotaFiscal, setStateNotaFiscal] = useState('');
  const [stateValorFrete, setStateValorFrete] = useState('');
  const [stateDesconto, setStateDesconto] = useState('');
  const [stateValorTotal, setStateValorTotal] = useState('');
  const [stateIdTransportadora, setStateIdTransportadora] = useState('');

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

  function enableEditMode(id, pedidosObj) {
    if(currentEditId === id) {
      setCurrentEditId('');
      setStateNotaFiscal('');
      setStateValorFrete('');
      setStateDesconto('');
      setStateValorTotal('');
      setStateIdTransportadora('');
      setEditMode(false);
    } else {
      setCurrentEditId(id);
      setStateNotaFiscal(pedidosObj.notafiscal);
      setStateValorFrete(pedidosObj.valorfrete);
      setStateDesconto(pedidosObj.desconto);
      setStateValorTotal(pedidosObj.valortotal);
      setStateIdTransportadora(pedidosObj.idTransportadora);
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
        <label htmlFor="notafiscal">
          Nota Fiscal:
          <input
            type="text"
            id="notafiscal"
            value={ stateNotaFiscal }
            onChange={ (event) => setStateNotaFiscal(event.target.value) }
          />
        </label>

        <label htmlFor="valorfrete">
          Valor do Frete:
          <input
            type="number"
            id="valorfrete"
            value={ stateValorFrete }
            onChange={ (event) => setStateValorFrete(event.target.value) }
          />
        </label>

        <label htmlFor="desconto">
          Desconto:
          <input
            type="number"
            id="desconto"
            value={ stateDesconto }
            onChange={ (event) => setStateDesconto(event.target.value) }
          />
        </label>

        <label htmlFor="valortotal">
          Valor Total:
          <input
            type="number"
            id="valortotal"
            value={ stateValorTotal }
            onChange={ (event) => setStateValorTotal(event.target.value) }
          />
        </label>

        <label htmlFor="idTransportadora">
          idTransportadora: 
          <input
            type="number"
            id="idTransportadora"
            value={ stateIdTransportadora }
            onChange={ (event) => setStateIdTransportadora(event.target.value) }
          />
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
          { id, datahora, notafiscal, valorfrete, desconto, valortotal, idTransportadora, transportadoras }, index) => (
            <tr key={ id }>
              <td>{ id }</td>
              <td>{ datahora }</td>
              <td>{ notafiscal }</td>
              <td>{ valorfrete }</td>
              <td>{ desconto }</td>
              <td>{ valortotal }</td>
              <td>{ idTransportadora }</td>
              <td>{ transportadoras.nome }</td>
              <td><button onClick={ () => enableEditMode(id, pedidos[index]) }>Editar</button></td>
              <td><button onClick={ () => deleteItem(id) }>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Pedidos;
