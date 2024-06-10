import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Polyfill pour ResizeObserver error
const resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/;

window.addEventListener('error', (event) => {
  if (resizeObserverLoopErrRe.test(event.message)) {
    event.stopImmediatePropagation();
  }
}, true);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
