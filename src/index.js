import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from "react-router-dom";

import {
  App
} from './components';

ReactDOM.render(
  <Router>

  <App /></Router>,

  <BrowserRouter>
  <App />
  </BrowserRouter>,
  document.getElementById('root')
  
);