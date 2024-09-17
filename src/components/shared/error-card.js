import {
  Card,
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
} from '@patternfly/react-core';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/dynamic/icons/exclamation-circle-icon';
import global_danger_color_200 from '@patternfly/react-tokens/dist/js/global_danger_color_200';
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
