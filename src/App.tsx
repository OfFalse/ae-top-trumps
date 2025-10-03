import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@carbon/styles/css/styles.css';
import { Header, HeaderName } from '@carbon/react';

function App() {
  return (
    <div className="App">
      <Header aria-label="AE Top Trumps">
        <HeaderName href="#" prefix="AE">
          Top Trumps
        </HeaderName>
      </Header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
