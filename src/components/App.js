import React, { useState, useEffect } from 'react';


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
        <Route path='/Login'>
          <Login userName={userName} setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
        </Route>
      </Switch>
      <Switch>
        <Route path='/Register'>
          <Register setIsLoggedIn = {setIsLoggedIn} />
        </Route>
        <Route path='/Cart'>
          <Cart />
        </Route>
        <Route path='/'>
          <Products />
        </Route>
        {/* can create another route in here for your component */}
      </Switch>
    </div>
  );
}

export default App;