import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route } from "react-router-dom";
import NavBarComp from './components/NavBarComp';
import Footer from './components/Footer';
import Home from './components/Home';
import Messengers from './components/Messengers';
function App() {
  return (
    <Router>
    <div className="App">
      <header className="header">
        <NavBarComp />
      </header>
      <div className="main-content ">
        <Route exact path="/" component={Home} />
        <Route path="/messengers" component={Messengers} />
      </div>
      <Footer copyright="Copyright © 2020. All Rights Reserved." />
    </div>
    </Router>
  );
}

export default App;
