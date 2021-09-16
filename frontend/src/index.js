import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import reducers from "./reducers";
import { BrowserRouter as Router } from 'react-router-dom';
import * as dotenv from 'dotenv';
import { Provider } from "react-redux";
import apiMiddleware from "./middleware/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(apiMiddleware),
));

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
	    <Router basename={process.env.PUBLIC_URL}>
	      <App /> 
	    </Router>
	</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
