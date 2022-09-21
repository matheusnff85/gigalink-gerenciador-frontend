import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '../Css/home.module.css';

function Home() {
  const history = useHistory();
  return(
    <main className={ styled.mainContainer }>
      <h1 className={ styled.title }>Escolha uma das opções para visualizar e/ou editar suas informações!</h1>
      <div className={ styled.buttonsDiv }>
        <button className={ styled.homeButton } onClick={ () => history.push('/emails') }>Emails</button>
        <button className={ styled.homeButton } onClick={ () => history.push('/fornecedores') }>Fornecedores</button>
        <button className={ styled.homeButton } onClick={ () => history.push('/items') }>Items</button>
        <button className={ styled.homeButton } onClick={ () => history.push('/pedidos') }>Pedidos</button>
        <button className={ styled.homeButton } onClick={ () => history.push('/produtos') }>Produtos</button>
        <button className={ styled.homeButton } onClick={ () => history.push('/telefones') }>Telefones</button>
        <button className={ styled.homeButton } onClick={ () => history.push('/transportadoras') }>Transportadoras</button>
      </div>

      <footer>
        <h4>Desenvolvido por <a href='https://www.linkedin.com/in/matheus-marinhodsp/'>Matheus Marinho</a></h4>
      </footer>
    </main>
  );
}

export default Home;
