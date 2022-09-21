import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Fornecedores from './Pages/Fornecedores';
import Emails from './Pages/Emails';
import Items from './Pages/Items';
import Transportadoras from './Pages/Transportadoras';
import Telefones from './Pages/Telefones';
import Produtos from './Pages/Produtos';
import Pedidos from './Pages/Pedidos';


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/fornecedores" component={ Fornecedores } />
          <Route exact path="/emails" component={ Emails } />
          <Route exact path="/items" component={ Items } />
          <Route exact path="/transportadoras" component={ Transportadoras } />
          <Route exact path="/telefones" component={ Telefones } />
          <Route exact path="/produtos" component={ Produtos } />
          <Route exact path="/pedidos" component={ Pedidos } />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
