import { Text } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import React from 'react';

const Link = ({ link, children }) => (
  <Text component="a" href={link} target="_blank" rel="noopener noreferrer">
    {children}
  </Text>
);

Link.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node,
};

export default Link;
