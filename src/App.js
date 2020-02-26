import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import ItemList from './components/ItemList';
import PersonalCollection from './components/PersonalCollection';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={['', '/', '/collection']} component={PersonalCollection} />
      <Route exact path="/search" component={ItemList} />
    </Switch>
  </ConnectedRouter>
);

export default App;
