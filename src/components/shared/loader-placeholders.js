import { Skeleton } from '@redhat-cloud-services/frontend-components/Skeleton';
import PropTypes from 'prop-types';
import React from 'react';

const AppPlaceholder = () => {
  return (
    <>
      <Skeleton size="md" />
      <br />
      <Skeleton size="md" />
    </>
  );
};

export const IconPlaceholder = ({ height }) => (
  <svg height={height} width={height}>
    <circle cx={height / 2} cy={height / 2} r={height / 2} fill="#ecebeb" />
  </svg>
);

IconPlaceholder.propTypes = {
  height: PropTypes.number.isRequired,
};

export default AppPlaceholder;
