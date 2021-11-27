import React, { useState, useEffect } from 'react';

import {
  Route, 
  Switch, 
  Redirect
} from "react-router-dom";

import {
  getSomething
} from '../api';

import Login from './Login'
import Register from './Register'
import Cart from './Cart'
import NavBar from './NavBar'

const App = () => {

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/Login'>
          <Login />
        </Route>
      </Switch>
      <Switch>
        <Route path='/'>
        <h1>Find your Groovy finds here!</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;