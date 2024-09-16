import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './utilities/store';

const AppEntry = () => (
  <Provider store={store([])}>
    <App />
  </Provider>
);

AppEntry.propTypes = {
  logger: PropTypes.func,
};

// imported directly by fec
export default AppEntry;
