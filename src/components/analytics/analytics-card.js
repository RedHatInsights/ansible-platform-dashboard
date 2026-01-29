import {
  Bullseye,
  Button,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  Divider,
  Flex,
  FlexItem,
  Label,
  Spinner,
  Content,
  Title,
} from '@patternfly/react-core';
import InfoCircleIcon from '@patternfly/react-icons/dist/dynamic/icons/info-circle-icon';
import WarningTriangleIcon from '@patternfly/react-icons/dist/dynamic/icons/warning-triangle-icon';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import React, { useEffect, useReducer } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import messages from '../../messages/messages';
import {
  fetchClusters,
  fetchErrorNotifications,
  fetchJobsData,
  fetchWarningNotifications,
} from '../../redux/actions/analytics-actions';
import { release } from '../../utilities/app-history';
import ErrorCard from '../shared/error-card';
import ConfigureAnalyticsCard from './configure-analytics-card';
import JobsChart from './jobs-chart';

const initialState = {
  isFetching: true,
};

const analyticsState = (state, action) => {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

const AnalyticsCard = () => {
  const [{ isFetching }, stateDispatch] = useReducer(
    analyticsState,
    initialState,
  );

  const {
    isAnalyticsAvailable,
    isError,
    clusters,
    errorNotifications,
    warningNotifications,
    jobsData,
  } = useSelector(
    ({
      analyticsReducer: {
        isAnalyticsAvailable,
        isError,
        clusters,
        errorNotifications,
        warningNotifications,
        jobsData,
      },
    }) => ({
      isAnalyticsAvailable,
      isError,
      clusters,
      errorNotifications,
      warningNotifications,
      jobsData,
    }),
  );

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    stateDispatch({ type: 'setFetching', payload: true });
    Promise.all([
      dispatch(fetchClusters()),
      dispatch(fetchErrorNotifications()),
      dispatch(fetchWarningNotifications()),
      dispatch(fetchJobsData()),
    ]).then(() => stateDispatch({ type: 'setFetching', payload: false }));
  }, []);

  const renderAnalyticsNotifications = () => {
    return (
      <>
        <DescriptionList
          className="pf-v6-c-description-list.pf-v6-m-vertical"
          columnModifier={{
            default: '2Col',
          }}
        >
          <Title headingLevel="h4">
            {intl.formatMessage(messages.analyticsCardNotificationsTitle)}
          </Title>
          <br />
          <DescriptionListDescription>
            {errorNotifications?.payload?.meta?.count || 0}
            <p />
            <Label
              className={'pf-v6-m-small'}
              color="red"
              icon={<InfoCircleIcon />}
              href={`${release}ansible/automation-analytics/notifications?default.severity=error`}
            >
              {intl.formatMessage(messages.critical)}
            </Label>
          </DescriptionListDescription>
          <DescriptionListDescription>
            {warningNotifications?.payload?.meta?.count || 0}
            <p />
            <Label
              color="orange"
              icon={<WarningTriangleIcon />}
              href={`${release}ansible/automation-analytics/notifications?default.severity=warning`}
            >
              {intl.formatMessage(messages.warning)}
            </Label>
          </DescriptionListDescription>
        </DescriptionList>
      </>
    );
  };

  const renderAnalyticsInfo = () => {
    return (
      <>
        <Flex className=" ans-l-flex ans-l-flex-automation-analytics-info">
          <FlexItem>
            <Content component="p">{intl.formatMessage(messages.analyticsCardDescription)}</Content>
            <br />
          </FlexItem>
          <FlexItem>
            <DescriptionList
              className="pf-v6-c-description-list.pf-v6-m-vertical"
              columnModifier={{
                default: '1Col',
              }}
            >
              <Title headingLevel="h4">
                {intl.formatMessage(messages.clusterTitle)}
              </Title>
              <DescriptionListDescription>
                {clusters?.payload?.templates?.length || 0}
                <br />
                <Link to={`${release}ansible/automation-analytics/clusters`}>
                  {intl.formatMessage(messages.totalClusters)}
                </Link>
              </DescriptionListDescription>
            </DescriptionList>
          </FlexItem>
        </Flex>
      </>
    );
  };

  const renderAnalyticsOther = () => (
    <>
      <Title headingLevel="h4">
        {intl.formatMessage(messages.analyticsJobTitle)}
      </Title>
      <br />
      <Flex direction={{ default: 'column' }}>
        <FlexItem className="pf-v6-u-m-0">
          <JobsChart items={jobsData?.payload?.items} />
        </FlexItem>
        <FlexItem className="pf-v6-u-m-0 pf-v6-u-pt-0 pf-v6-u-pb-0 pf-v6-u-pl-lg">
          <Bullseye>
            <Button
              component="a"
              variant="link"
              href={`${release}ansible/automation-analytics/job-explorer`}
            >
              {intl.formatMessage(messages.jobsExplorer)}
            </Button>
          </Bullseye>
        </FlexItem>
      </Flex>
    </>
  );

  const renderAnalyticsCards = () => {
    if (isError) {
      return <ErrorCard />;
    } else if (isFetching) {
      return (
        <Section style={{ backgroundColor: 'white', minHeight: '100%' }}>
          <Bullseye>
            <Spinner />
          </Bullseye>
        </Section>
      );
    } else {
      return (
        <Flex direction={{ default: 'column' }}>
          <FlexItem>
            <Flex className="ans-l-flex ans-l-flex-automation-analytics-card">
              <FlexItem>{renderAnalyticsInfo()}</FlexItem>
              <Divider />
              <FlexItem>{renderAnalyticsNotifications()}</FlexItem>
            </Flex>
          </FlexItem>
          <FlexItem>
            <FlexItem>{renderAnalyticsOther()}</FlexItem>
          </FlexItem>
        </Flex>
      );
    }
  };

  return !isAnalyticsAvailable ? (
    <ConfigureAnalyticsCard />
  ) : (
    <>
      <Card className="ans-c-card-dashboard">
        <CardTitle>
          <Title headingLevel="h3">
            {intl.formatMessage(messages.analyticsTitle)}
          </Title>
        </CardTitle>
        <CardBody className="pf-v6-u-pb-sm">{renderAnalyticsCards()}</CardBody>
      </Card>
    </>
  );
};

export default AnalyticsCard;
