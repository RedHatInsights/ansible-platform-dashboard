import {
  Bullseye,
  Button,
  Card,
  CardBody,
  CardTitle,
  Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
  Level,
  LevelItem,
  Popover,
  Spinner,
  Stack,
  StackItem,
  Content,
  ContentVariants,
  Title,
} from '@patternfly/react-core';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/dynamic/icons/external-link-alt-icon';
import OutlinedQuestionCircleIcon from '@patternfly/react-icons/dist/dynamic/icons/outlined-question-circle-icon';
import { Section } from '@redhat-cloud-services/frontend-components/Section';
import React, { useContext, useEffect, useReducer } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import messages from '../../messages/messages';
import {
  fetchCollection,
  fetchCollections,
  fetchPartners,
  fetchSyncCollections,
} from '../../redux/actions/hub-actions';
import UserContext from '../../user-context';
import { release } from '../../utilities/app-history';
import { useNotifications } from '@redhat-cloud-services/frontend-components-notifications/hooks';
import ErrorCard from '../shared/error-card';
import { contentCounts } from './content-counts';
import { Logo } from './logo';

const initialState = {
  isFetching: true,
};

const hubState = (state, action) => {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

const HubCard = () => {
  const [{ isFetching }, stateDispatch] = useReducer(hubState, initialState);

  const { isError, collection, collections, syncCollections, partners } =
    useSelector(
      ({
        hubReducer: {
          isError,
          collection,
          collections,
          syncCollections,
          partners,
        },
      }) => ({ isError, collection, collections, syncCollections, partners }),
    );

  const { userIdentity } = useContext(UserContext);

  const dispatch = useDispatch();
  const intl = useIntl();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const loadHubData = async () => {
      stateDispatch({ type: 'setFetching', payload: true });

      const results = await Promise.all([
        dispatch(fetchCollections()),
        dispatch(fetchPartners()),
        dispatch(fetchSyncCollections(userIdentity?.identity?.account_number)),
      ]);

      // Check if any requests failed (excluding 404s which are handled by availability flags)
      const failures = results.filter(
        result => !result.success && result.error?.status !== 404
      );

      if (failures.length > 0) {
        // Show notification only for unexpected errors (not 404s)
        const firstError = failures[0].error;
        addNotification({
          dismissable: true,
          title: firstError.title,
          description: firstError.description,
          variant: 'danger',
        });
      }

      stateDispatch({ type: 'setFetching', payload: false });
    };

    loadHubData();
  }, [dispatch, userIdentity?.identity?.account_number, addNotification]);

  useEffect(() => {
    const loadFeaturedCollection = async () => {
      if (collections?.meta?.count > 0) {
        const d = new Date();
        const day = d.getDate();
        const count = collections?.meta?.count;
        const offset = count <= day ? count - 1 : day - 1;

        stateDispatch({ type: 'setFetching', payload: true });

        const result = await dispatch(fetchCollection(offset));

        // Only show notification for unexpected errors (not 404s)
        if (!result.success && result.error?.status !== 404) {
          addNotification({
            dismissable: true,
            title: result.error.title,
            description: result.error.description,
            variant: 'danger',
          });
        }

        stateDispatch({ type: 'setFetching', payload: false });
      }
    };

    loadFeaturedCollection();
  }, [collections, dispatch, addNotification]);

  const renderHubInfo = () => (
    <>
      <Content>
        <Content component="p">
          {intl.formatMessage(messages.hubCardDescription)} <br />
          <br />
        </Content>
      </Content>
      <Grid hasGutter>
        <GridItem align="right" span={2}>
          <Content>
            <Content component={ContentVariants.h1}>{partners?.meta?.count}</Content>
          </Content>
        </GridItem>
        <GridItem span={10}>
          <Button
            component="a"
            variant="link"
            href={`${release}ansible/automation-hub/partners`}
          >
            {intl.formatMessage(messages.partners)}
          </Button>
        </GridItem>

        <GridItem align="right" span={2}>
          <Content>
            <Content component={ContentVariants.h1}>{collections?.meta?.count}</Content>
          </Content>
        </GridItem>
        <GridItem span={10}>
          <Button
            component="a"
            variant="link"
            href={`${release}ansible/automation-hub`}
          >
            {intl.formatMessage(messages.collections)}
          </Button>
        </GridItem>

        <GridItem align="right" span={2}>
          <Content>
            <Content component={ContentVariants.h1}>
              {syncCollections?.meta?.count}
            </Content>
          </Content>
        </GridItem>
        <GridItem span={10}>
          <Level hasGutter className="pf-v5-u-pl-md pf-v5-u-pt-sm">
            <LevelItem style={{ marginRight: 8 }}>
              {intl.formatMessage(messages.syncCollections)}
            </LevelItem>
            <LevelItem>
              <Popover
                headerContent={
                  <div>{intl.formatMessage(messages.syncCollections)}</div>
                }
                bodyContent={
                  <div>
                    {intl.formatMessage(messages.syncCollectionsTooltip)}
                  </div>
                }
              >
                <Button
                  variant="link"
                  style={{ padding: 0 }}
                  icon={<OutlinedQuestionCircleIcon />}
                />
              </Popover>
            </LevelItem>
          </Level>
        </GridItem>
      </Grid>
    </>
  );

  const filterContents = (contents) => {
    if (contents) {
      return contents.filter(
        (item) =>
          !['doc_fragments', 'module_utils'].includes(item.content_type),
      );
    }

    return contents;
  };

  const renderHubFeaturedCollection = () => {
    const featuredCollection = collection?.data ? collection?.data[0] : null;
    const content = featuredCollection
      ? contentCounts(
          filterContents(
            featuredCollection?.latest_version?.metadata?.contents,
          ),
        )
      : undefined;
    return (
      <Flex
        direction={{ default: 'column' }}
        alignSelf={{ default: 'alignSelfStretch' }}
      >
        <Title headingLevel="h4">
          {intl.formatMessage(messages.hubCardFeaturedCollectionTitle)}
        </Title>
        <br />
        {featuredCollection && (
          <Flex direction={{ default: 'column' }}>
            <FlexItem>
              <Level hasGutter="sm">
                <LevelItem>
                  <Logo
                    alt={featuredCollection?.namespace?.company + ' logo'}
                    image={featuredCollection?.namespace?.avatar_url}
                    size="50px"
                  />
                </LevelItem>
                <LevelItem>
                  <Label>Certified</Label>
                </LevelItem>
              </Level>
            </FlexItem>
            <FlexItem>
              <Button
                component="a"
                variant="link"
                className="pf-v5-u-p-0"
                href={
                  `${release}ansible/automation-hub/repo/published/${featuredCollection?.namespace?.name}/` +
                  `${
                    featuredCollection?.latest_version?.name ||
                    featuredCollection?.name
                  }`
                }
              >
                {featuredCollection?.latest_version?.name ||
                  featuredCollection?.name}
              </Button>
              <Content>
                <Content component={ContentVariants.small}>
                  {' '}
                  Provided by{' '}
                  {featuredCollection?.namespace?.company ||
                    featuredCollection?.namespace?.name}
                </Content>
              </Content>
            </FlexItem>
            <FlexItem>
              <Content>
                <Content component={ContentVariants.p}>
                  {featuredCollection?.latest_version?.metadata?.description}
                </Content>
              </Content>
            </FlexItem>
            <FlexItem>
              <Grid hasGutter="md">
                <GridItem id={'collectionModuleCount'} span="4">
                  {content?.contents?.module || '0'}
                </GridItem>
                <GridItem id={'collectionRoleCount'} span="4">
                  {content?.contents?.role || 0}
                </GridItem>
                <GridItem id={'collectionPluginCount'} span="4">
                  {content?.contents?.plugin || 0}
                </GridItem>
                <GridItem span="4">
                  <Content>
                    <Content component={ContentVariants.p}>
                      {intl.formatMessage(messages.modules)}
                    </Content>
                  </Content>
                </GridItem>
                <GridItem span="4">
                  <Content>
                    <Content component={ContentVariants.p}>
                      {intl.formatMessage(messages.roles)}
                    </Content>
                  </Content>
                </GridItem>
                <GridItem span="4">
                  <Content>
                    <Content component={ContentVariants.p}>
                      {intl.formatMessage(messages.plugins)}
                    </Content>
                  </Content>
                </GridItem>
              </Grid>
            </FlexItem>
          </Flex>
        )}
      </Flex>
    );
  };

  const renderHubOther = () => {
    return (
      <Flex
        direction={{ default: 'column' }}
        justifyContent={{ default: 'justifyContentSpaceBetween' }}
        alignSelf={{ default: 'alignSelfStretch' }}
      >
        <FlexItem>
          <Stack hasGutter="sm">
            <StackItem>
              <Title headingLevel="h4">
                {intl.formatMessage(messages.hubCardCertifiedCollectionTitle)}
              </Title>
            </StackItem>
            <StackItem>
              <Content component={ContentVariants.p}>
                {intl.formatMessage(
                  messages.hubCardCertifiedCollectionDescription,
                )}
              </Content>
            </StackItem>
            <StackItem>
              <Content component="p" className="pf-v5-u-text-align-center">
                <br />
                <br />
                <Button icon={<ExternalLinkAltIcon />}
                  component="a"
                  variant="link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    // FIXME: 2.4 version 404s, leaving 2.3
                    `https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.3/html/managing_red_hat_certified_and_ansible_galaxy_collections_in_automation_hub/index`
                  }
                >
                  {intl.formatMessage(messages.learnMoreButton)}&nbsp;

                </Button>
              </Content>
            </StackItem>
          </Stack>
        </FlexItem>
      </Flex>
    );
  };

  const renderHubCards = () => {
    if (isError) {
      return <ErrorCard />;
    }

    if (isFetching) {
      return (
        <Section style={{ backgroundColor: 'white', minHeight: '100%' }}>
          <Bullseye>
            <Spinner />
          </Bullseye>
        </Section>
      );
    } else {
      return (
        <Flex className="ans-l-flex ans-l-flex-automation-hub-card">
          <Flex>{renderHubInfo()}</Flex>
          <Divider />
          {renderHubFeaturedCollection()}
          <Divider />
          {renderHubOther()}
        </Flex>
      );
    }
  };

  return (
    <>
      <Card className="ans-c-card-dashboard">
        <CardTitle>
          <Title headingLevel="h3">
            {intl.formatMessage(messages.hubTitle)}
          </Title>
        </CardTitle>
        <CardBody>{renderHubCards()}</CardBody>
      </Card>
    </>
  );
};

export default HubCard;
