import React from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyConverter from './CurrencyConverter'

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" width="200" height="200"/>
        <CurrencyConverter/>
    </div>
  );
}

export default App;
