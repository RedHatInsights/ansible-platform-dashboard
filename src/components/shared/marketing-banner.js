import { PageSection } from '@patternfly/react-core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './marketing-banner.scss';

const MarketingBanner = ({
  className,
  hasGraphic,
  graphicRight,
  light1000,
  fullBleed,
  style,
  children,
}) => {
  const MarketingBannerSectionClasses = classNames(
    className,
    'ans-c-marketing-banner',
    { [`ans-m-with-graphic `]: hasGraphic },
    { [`ans-m-graphic-right`]: graphicRight },
    { [`ans-m-light-1000 pf-m-light-1000`]: light1000 },
    { [`ans-m-full-bleed`]: fullBleed },
  );

  return (
    <PageSection
      className={MarketingBannerSectionClasses}
      style={style}
      isWidthLimited
    >
      {children}
    </PageSection>
  );
};

export default MarketingBanner;

MarketingBanner.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  style: PropTypes.any,
  graphicRight: PropTypes.bool,
  hasGraphic: PropTypes.bool,
  light1000: PropTypes.bool,
  fullBleed: PropTypes.bool,
  isWidthLimited: PropTypes.bool,
};
