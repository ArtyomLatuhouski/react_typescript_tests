//outer
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

//local
import {store} from "./store";
import './index.css';
import App from './App';


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);

