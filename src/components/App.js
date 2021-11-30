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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/Login'>
          <Login userName={userName} setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
        </Route>
      </Switch>
      <Switch>
        <Route path='/'>
        <h1>Find your Groovy finds here!</h1>
        </Route>
        <Route path='/Register'>
          <Register setIsLoggedIn = {setIsLoggedIn} />
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