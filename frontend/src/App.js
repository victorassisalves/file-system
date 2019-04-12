import React, { Component } from 'react';
import './App.css';
import Routes from "./routes"

class App extends Component {
  render() {
    return <Routes/>;
  }
}

// const App = () => <Main /> // Funciona igual ao class App extends. Stateless 

export default App;
