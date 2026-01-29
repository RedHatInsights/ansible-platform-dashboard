import {
  EmptyState,
  EmptyStateBody,
  Title,
} from '@patternfly/react-core';
import PathMissingIcon from '@patternfly/react-icons/dist/dynamic/icons/path-missing-icon';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = (props) => {
  const { title, body, link, buttonText } = props;
  return (
    <EmptyState titleText={<Title headingLevel="h4" size={'4xl'} style={{ padding: '2em' }}>
        {title}
      </Title>} icon={PathMissingIcon} variant={'full'}>
      <EmptyStateBody>{body}</EmptyStateBody>
      <Link to={link.replace('/', '')}>{buttonText}</Link>
    </EmptyState>
  );
};

Error404.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  link: PropTypes.string,
  buttonText: PropTypes.string,
};

Error404.defaultProps = {
  title: '404: Page does not exist.',
  body: "Let's find you a new one.",
  buttonText: 'Return to home page',
  link: '/',
};

export default Error404;
