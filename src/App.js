import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Links from './components/Links';
import Routes from './components/Routes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Links />
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
