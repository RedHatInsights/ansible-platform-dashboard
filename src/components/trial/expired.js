import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  PageSection,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import ExclamationIcon from '@patternfly/react-icons/dist/dynamic/icons/exclamation-circle-icon';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../constants/routes';
import expiredMessages from '../../messages/expired.messages';
import Link from './link';
import Logo from './logo';
import Resources from './resources';

const Expired = () => {
  const intl = useIntl();
  const { clearAnsibleTrialFlag } = useChrome();
  useEffect(() => {
    if (clearAnsibleTrialFlag) {
      clearAnsibleTrialFlag();
    }
  }, []);

  return (
    <React.Fragment>
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbItem
            component={({ href, ...props }) => (
              <RouterLink to={href} {...props} />
            )}
            to={DASHBOARD_ROUTE}
          >
            {intl.formatMessage(expiredMessages.overviewLink)}
          </BreadcrumbItem>
          <BreadcrumbItem isActive>
            {intl.formatMessage(expiredMessages.trialExpired)}
          </BreadcrumbItem>
        </Breadcrumb>
        <TextContent>
          <Flex
            spaceItems={{ default: 'spaceItemsSm' }}
            alignItems={{ default: 'alignItemsCenter' }}
          >
            <FlexItem>
              <ExclamationIcon
                size="md"
                color="var(--pf-global--danger-color--100)"
              />
            </FlexItem>
            <FlexItem>
              <Title headingLevel="h2" size="lg">
                {intl.formatMessage(expiredMessages.title)}
              </Title>
            </FlexItem>
          </Flex>
          <Text className="pf-u-mt-md">
            {intl.formatMessage(expiredMessages.description)}
          </Text>
        </TextContent>
      </PageHeader>
      <PageSection>
        <Stack hasGutter>
          <StackItem>
            <Card>
              <CardBody className="pf-u-pb-0">
                <Title headingLevel="h2" size="xl">
                  {intl.formatMessage(expiredMessages.wannaTry)}
                </Title>
                <div className="pf-u-display-flex">
                  <div style={{ flexGrow: 1, alignSelf: 'center' }}>
                    <TextContent>
                      <Text>
                        {intl.formatMessage(expiredMessages.wannaTryText, {
                          date: '',
                        })}
                      </Text>
                    </TextContent>
                  </div>
                  <Logo />
                </div>
                <Divider className="pf-u-my-lg" />
                <Title headingLevel="h2" size="xl" className="pf-u-mb-md">
                  {intl.formatMessage(expiredMessages.readyBuy)}
                </Title>
                <div className="pf-u-display-flex pf-u-mb-md">
                  <div className="pf-u-mr-md">
                    <pfe-icon icon="rh-icon-support" size="lg" />
                  </div>
                  <div style={{ flexGrow: 1, alignSelf: 'center' }}>
                    <TextContent>
                      <Text>
                        {intl.formatMessage(expiredMessages.readyBuyText, {
                          a: (chunks) => (
                            <Link link="https://www.redhat.com/en/about/value-of-subscription">
                              {chunks}
                            </Link>
                          ),
                        })}
                      </Text>
                    </TextContent>
                  </div>
                </div>
                <Grid hasGutter>
                  <GridItem md={6}>
                    <Card isFlat className="pf-u-px-md pf-u-h-100">
                      <CardTitle>
                        {intl.formatMessage(expiredMessages.sales)}
                      </CardTitle>
                      <CardBody>
                        {intl.formatMessage(expiredMessages.salesText)}
                      </CardBody>
                      <CardFooter>
                        <Button
                          component="a"
                          href="https://www.redhat.com/en/contact"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {intl.formatMessage(expiredMessages.salesButton)}
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem md={6}>
                    <Card isFlat className="pf-u-px-md pf-u-h-100">
                      <CardTitle>
                        {intl.formatMessage(expiredMessages.partners)}
                      </CardTitle>
                      <CardBody>
                        {intl.formatMessage(expiredMessages.partnersText)}
                      </CardBody>
                      <CardFooter>
                        <Button
                          component="a"
                          href="https://redhat.secure.force.com/finder/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {intl.formatMessage(expiredMessages.partnersButton)}
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </Grid>
                <Divider className="pf-u-my-lg" />
                <Resources />
              </CardBody>
            </Card>
          </StackItem>
        </Stack>
      </PageSection>
    </React.Fragment>
  );
};

export default Expired;
