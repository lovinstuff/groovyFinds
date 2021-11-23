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
      <h1>Find your Groovy finds here!</h1>
      <NavBar />
      <Switch>
        <Route path='/Login'>
          <Login />
        </Route>
        <Route path='/Register'>
          <Register />
        </Route>
        <Route path='/Cart'>
          <Cart />
        </Route>
        {/* can create another route in here for your component */}
      </Switch>

    </div>
  );
}

export default App;