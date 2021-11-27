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
<<<<<<< HEAD
      </Switch>
      <Switch>
        <Route path='/'>
        <h1>Find your Groovy finds here!</h1>
        </Route>
=======
        <Route path='/Register'>
          <Register />
        </Route>
        <Route path='/Cart'>
          <Cart />
        </Route>
        {/* can create another route in here for your component */}
>>>>>>> 5030be7b653c35fc00d170a7d8a2a2f1b752828c
      </Switch>
    </div>
  );
}

export default App;