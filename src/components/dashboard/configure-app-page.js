import {
  Button,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  PageSection,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/dynamic/icons/external-link-alt-icon';
import React from 'react';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import HubCard from '../automation-hub/hub-card';
import ConfigureCard from '../shared/configure-card';
import DashboardHeader from '../shared/dashboard-header';

const renderButtons = (intl) => (
  <Flex>
    <FlexItem>
      <Button
        size="lg"
        component="a"
        variant="primary"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.4/html/red_hat_ansible_automation_platform_installation_guide/index`}
      >
        {intl.formatMessage(messages.configureLink)}
      </Button>
    </FlexItem>
  </Flex>
);

const renderAnalyticsConfigButton = (intl) => (
  <Flex>
    <FlexItem>
      <Button
        component="a"
        variant="link"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://docs.ansible.com/ansible-tower/latest/html/administration/usability_data_collection.html`}
      >
        {intl.formatMessage(messages.configureAnalyticsLink)}&nbsp;
        <ExternalLinkAltIcon />
      </Button>
    </FlexItem>
  </Flex>
);

const ConfigureAppPage = () => {
  const intl = useIntl();

  return (
    <>
      <DashboardHeader
        title={intl.formatMessage(messages.noAppTitle)}
        description={intl.formatMessage(messages.configDescription)}
        renderButtons={() => renderButtons(intl)}
      />
      <PageSection>
        <Stack hasGutter="md">
          <StackItem>
            <Grid hasGutter="xl">
              <GridItem md={12} sm={12}>
                <ConfigureCard
                  title={intl.formatMessage(messages.configureAnalyticsTitle)}
                  description={intl.formatMessage(
                    messages.configureAnalyticsDescription,
                  )}
                  renderButtons={() => renderAnalyticsConfigButton(intl)}
                />
              </GridItem>
            </Grid>
          </StackItem>
          <StackItem>
            <HubCard />
          </StackItem>
        </Stack>
      </PageSection>
    </>
  );
};

export default ConfigureAppPage;
