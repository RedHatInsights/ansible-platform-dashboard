import {
  Card,
  EmptyState,
  EmptyStateBody,
} from '@patternfly/react-core';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/dynamic/icons/exclamation-circle-icon';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import '../../App.scss';
import messages from '../../messages/messages';

const Br = () => <br />;

const ErrorCard = () => {
  const intl = useIntl();
  return (
    <Card className="ans-c-card-dashboard">
      <EmptyState
        headingLevel="h2"
        titleText={<>{intl.formatMessage(messages.errorStateTitle)}</>}
        variant={'full'}
        icon={ExclamationCircleIcon}
        status="danger"
        className="ans-c-empty-state-error"
      >
        <EmptyStateBody className="ans-c-empty-state-error__body">
          {intl.formatMessage(messages.errorStateDescription, {
            supportLink: (
              <a href={'https://access.redhat.com/support'}>Red Hat support</a>
            ),
            statusLink: <a href={'https://status.redhat.com'}> status</a>,
            br: Br,
          })}
        </EmptyStateBody>
      </EmptyState>
    </Card>
  );
};

ErrorCard.propTypes = {
  appName: PropTypes.string,
};

export default ErrorCard;
