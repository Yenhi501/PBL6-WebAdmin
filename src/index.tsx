import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';

document.title = 'Dashboard Admin React';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const store = createStore(rootReducer);
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
);
reportWebVitals();
