import React from 'react';
import PropTypes from 'prop-types';
import '../../App.scss';
import {
  Card,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateHeader,
} from '@patternfly/react-core';
import { global_danger_color_200 } from '@patternfly/react-tokens';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/dynamic/icons/exclamation-circle-icon';

const Br = () => <br />;

const ErrorCard = () => {
  const intl = useIntl();
  return (
    <Card className="ans-c-card-dashboard">
      <EmptyState variant={'full'} className="ans-c-empty-state-error">
        <div>
          <EmptyStateIcon
            icon={ExclamationCircleIcon}
            color={global_danger_color_200.value}
          />
        </div>
        <EmptyStateHeader
          titleText={<>{intl.formatMessage(messages.errorStateTitle)}</>}
          headingLevel="h2"
        />

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
