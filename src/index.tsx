import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from "./App";
import AuthProvider from "./context/AuthProvider";


ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>
    , document.getElementById('root')
);
