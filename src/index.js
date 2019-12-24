import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from "axios";

axios.defaults.baseURL = "https://react-burger-app-8dfbd.firebaseio.com/";

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
