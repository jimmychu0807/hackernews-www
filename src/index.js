import React from 'react';
import ReactDOM from 'react-dom';

// own components
import App from './components/App';
import Providers from './components/Providers';
import * as serviceWorker from './serviceWorker';

// other assets
import './styles/index.css';

ReactDOM.render(<Providers><App /></Providers>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
