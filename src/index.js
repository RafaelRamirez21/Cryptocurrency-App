import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/styles/_global.scss'
import store from './app/store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>

  </Router>,
  document.getElementById('app'));