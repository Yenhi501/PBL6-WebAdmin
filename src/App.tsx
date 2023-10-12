import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/theme.css';
import './assets/css/index.css';
import { LayoutAdmin as Layout } from './pages/Layout/index';
import './index.scss';

const store = createStore(rootReducer);
export const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};
