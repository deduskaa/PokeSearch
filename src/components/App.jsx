import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FrontPage } from './pages/FrontPage';
import { Pokedex } from './pages/Pokedex';
import { Pokemon } from './pages/pokemon/Pokemon';

export const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/pokedex" component={Pokedex} />
        <Route exact path="/pokemon/:name" component={Pokemon} />
      </Switch>
    </Router>
  );
};
