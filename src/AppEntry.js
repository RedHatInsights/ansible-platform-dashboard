import React from 'react';
import { Provider } from 'react-redux';
import store from './utilities/store';
import App from './App';
import PropTypes from 'prop-types';

const AppEntry = () => (
  <Provider store={store([])}>
    <App />
  </Provider>
);

AppEntry.propTypes = {
  logger: PropTypes.func,
};

export default AppEntry;
