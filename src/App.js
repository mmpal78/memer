import React, { Component } from 'react';

import Nav from './components/Nav.js';
import Landing from './components/Landing.js';
import Menu from './components/Menu';
import './css/normalize.css';
import './css/app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Menu />
        <Nav />
        <Landing />
      </div>
    );
  }
}

export default App;
