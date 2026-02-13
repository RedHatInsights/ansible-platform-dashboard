import { Content } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import React from 'react';

const Link = ({ link, children }) => (
  <Content component="a" href={link} target="_blank" rel="noopener noreferrer">
    {children}
  </Content>
);

Link.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node,
};

export default Link;
