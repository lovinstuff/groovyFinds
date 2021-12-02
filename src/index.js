import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from "react-router-dom";

import {
  App
} from './components';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);