import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

import App from './app';
import {initSocket} from './socket';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let component;

component = (initSocket(store), <Provider store={store}><App /></Provider>);

ReactDOM.render(component, document.querySelector("main"));
