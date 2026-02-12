import { PageSection, Stack, StackItem } from '@patternfly/react-core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import messages from '../../messages/messages';
import AnalyticsCard from '../analytics/analytics-card';
import HubCard from '../automation-hub/hub-card';
import DashboardHeader from '../shared/dashboard-header';
import NoAppState from '../shared/no-app-state';
import ConfigureAppPage from './configure-app-page';

const PlatformPage = () => {
  const intl = useIntl();
  const { isAnalyticsAvailable } = useSelector(
    ({ analyticsReducer: { isAnalyticsAvailable } }) => ({
      isAnalyticsAvailable,
    }),
  );

  const { isHubAvailable } = useSelector(
    ({ hubReducer: { isHubAvailable: isHubAvailable } }) => ({
      isHubAvailable,
    }),
  );

  if (!isAnalyticsAvailable && !isHubAvailable) {
    return <NoAppState />;
  }

  if (isHubAvailable && !isAnalyticsAvailable) {
    return <ConfigureAppPage />;
  }

  return (
    <>
      <DashboardHeader
        title={intl.formatMessage(messages.overview)}
        description={''}
      />
      <PageSection hasBodyWrapper={false}>
        <Stack hasGutter="md">
          <StackItem>
            <AnalyticsCard />
          </StackItem>
          <StackItem>
            <HubCard />
          </StackItem>
        </Stack>
      </PageSection>
    </>
  );
};

export default PlatformPage;
