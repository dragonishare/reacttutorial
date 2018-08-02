import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let a = 'fdsfs';
const b = x => x * 2;
const Item = item => {
  return <div {...item}>hhh</div>;
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Item
            key="1"
            name="fsdfds"
            color="fsdfds"
            age="ffsdfds"
            text="fsdfdsf"
          />
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to React
            {a * b}
          </h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
