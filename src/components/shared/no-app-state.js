import { Button, Flex, FlexItem } from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/dynamic/icons/arrow-right-icon';
import React from 'react';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import DashboardHeader from './dashboard-header';

const renderButtons = (intl) => (
  <Flex>
    <FlexItem>
      <Button
        size="lg"
        component="a"
        variant="primary"
        href={`https://www.redhat.com/en/technologies/management/ansible/try-it`}
      >
        {intl.formatMessage(messages.tryItButton)}
      </Button>
    </FlexItem>
    <FlexItem>
      <Button icon={<ArrowRightIcon />}
        component="a"
        size="lg"
        variant="link"
        target="_blank"
        rel="noreferrer"
        href="https://www.redhat.com/en/technologies/management/ansible"
      >
        {intl.formatMessage(messages.learnMoreButton)} &nbsp;

      </Button>
    </FlexItem>
  </Flex>
);

const NoAppState = () => {
  const intl = useIntl();

  return (
    <DashboardHeader
      title={intl.formatMessage(messages.noAppTitle)}
      description={intl.formatMessage(messages.noAppDescription)}
      renderButtons={renderButtons}
    />
  );
};

export default NoAppState;
