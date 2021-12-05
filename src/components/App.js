import React, { useState, useEffect } from "react";
import AdminUsers from "./Admin_Page/Admin_Users";

import {
  Route, 
  Switch, 
  Redirect
} from "react-router-dom";

import Login from './Login'
import Register from './Register'
import Cart from './Cart'
import NavBar from './NavBar'
import Products from './Product/Products'


const {
  storeSessionId
} = require('../auth/index')

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState([]);
  const [shoppingSession, setShoppingSession] = useState(0);

  useEffect(() => {
    storeSessionId(shoppingSession)
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
          <Cart setShoppingSession={ setShoppingSession }/>
        </Route>
        <Route exact path='/'>
          <Products cart={ cart } setCart={ setCart }/>
          <h1>Find your Groovy finds here!</h1>
        </Route>
        {/* can create another route in here for your component */}
      </Switch>
    </div>
  );
};

export default App;
