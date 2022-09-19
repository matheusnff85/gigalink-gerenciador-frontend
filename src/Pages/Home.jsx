import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  return(
    <>
      <h1>Escolha uma das opções para visualizar e/ou editar suas informações!</h1>
      <button onClick={ () => history.push('/emails') }>Emails</button>
      <button onClick={ () => history.push('/fornecedores') }>Fornecedores</button>
      <button onClick={ () => history.push('/items') }>Items</button>
      <button onClick={ () => history.push('/pedidos') }>Pedidos</button>
      <button onClick={ () => history.push('/produtos') }>Produtos</button>
      <button onClick={ () => history.push('/telefones') }>Telefones</button>
      <button onClick={ () => history.push('/transportadoras') }>Transportadoras</button>

      <footer>
        <h4>Desenvolvido por <a href='https://www.linkedin.com/in/matheus-marinhodsp/'>Matheus Marinho</a></h4>
      </footer>
    </>
  );
}

export default Home;
