import React, { useState, useEffect } from 'react';
import AdminUsers from "./Admin_Page/Admin_Users";

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
        <Route path='/Admin'><AdminUsers /></Route>
        <Route path='/'></Route>
      </Switch>

    </div>
  );
}

export default App;