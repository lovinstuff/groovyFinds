import React, { useState, useEffect } from 'react';
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

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/Admin'><AdminUsers /></Route>
        <Route path='/Login'>
          <Login userName={userName} setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
        </Route>

        <Route path='/Register'>
          <Register setIsLoggedIn = {setIsLoggedIn} />
        </Route>
        <Route path='/Cart'>
          <Cart />
        </Route>
        <Route path='/'>
          <Products />
          <h1>Find your Groovy finds here!</h1>
        </Route>
        {/* can create another route in here for your component */}
      </Switch>
    </div>
  );
}

export default App;