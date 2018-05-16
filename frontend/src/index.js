import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './index.css';
import Main from './components/mainComponent'

class App extends React.Component {
    render() {
        return (
            <Main/>
        )
    }
};

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>

), document.getElementById('root'));