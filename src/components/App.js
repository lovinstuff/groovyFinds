import React, { useState, useEffect } from "react";
import AdminUsers from "./Admin_Page/Admin_Users";

import {
  Route, 
  Switch, 
  Redirect
} from "react-router-dom";

import { createNewSession } from '../api';

import Login from './Login'
import Register from './Register'
import Cart from './Cart/Cart'
import NavBar from './NavBar'
import Products from './Product/Products'


const {
  getSessionId, 
  storeSessionId
} = require('../auth')

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState([]);

  async function createSession() {
    try {
      const newSessionID = await createNewSession();
      storeSessionId(newSessionID);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!getSessionId() && getSessionId() !== 0) {
      createSession();
    } 
  })

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/Admin">
          <AdminUsers />
        </Route>
        <Route path="/Login">
          <Login
            userName={userName}
            setUserName={setUserName}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        </Route>
        <Route path="/Register">
          <Register setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path='/Cart'>
          <Cart 
            cart={cart} 
            setCart={setCart}
          />
        </Route>
        <Route exact path='/'>
          <Products cart={ cart } setCart={ setCart }/>
          <h1>Find your Groovy finds here!</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
