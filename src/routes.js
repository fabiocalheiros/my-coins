import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Coin from './pages/Coin';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/coin/:coin" component={Coin} />
      </Switch>
    </BrowserRouter>
  );
}
