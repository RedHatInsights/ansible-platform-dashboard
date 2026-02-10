import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  FlexItem,
  PageSection,
  Stack,
  StackItem,
  Content,
  Title,
} from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/dynamic/icons/check-circle-icon';
import DownloadIcon from '@patternfly/react-icons/dist/dynamic/icons/download-icon';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../constants/routes';
import successMessages from '../../messages/success.messages';
import { ANSIBLE_CHECKSUM } from './constants';
import downloadTrial from './download-trial';
import Link from './link';
import Logo from './logo';
import Requirements from './requirements';
import Resources from './resources';

const Success = () => {
  const intl = useIntl();
  const { setAnsibleTrialFlag, isAnsibleTrialFlagActive } = useChrome();
  useEffect(() => {
    // check chromeAPI for functions
    if (isAnsibleTrialFlagActive && setAnsibleTrialFlag) {
      const trialActive = isAnsibleTrialFlagActive();
      // set flag only if the local storage is empty or trial has expired
      if (trialActive === undefined || trialActive === false) {
        setAnsibleTrialFlag();
      }
    }
  }, []);

  return (
    <>
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbItem
            component={({ href, ...props }) => (
              <RouterLink to={href} {...props} />
            )}
            to={DASHBOARD_ROUTE}
          >
            {intl.formatMessage(successMessages.overviewLink)}
          </BreadcrumbItem>
          <BreadcrumbItem isActive>
            {intl.formatMessage(successMessages.download)}
          </BreadcrumbItem>
        </Breadcrumb>
        <Content>
          <Flex
            spaceItems={{ default: 'spaceItemsSm' }}
            alignItems={{ default: 'alignItemsCenter' }}
          >
            <FlexItem>
              <CheckCircleIcon
                size="md"
                color="var(--pf-global--success-color--100)"
              />
            </FlexItem>
            <FlexItem>
              <Title headingLevel="h2" size="lg">
                {intl.formatMessage(successMessages.title)}
              </Title>
            </FlexItem>
          </Flex>
          <Content component="p" className="pf-u-mt-md">
            {intl.formatMessage(successMessages.description)}
          </Content>
          <Content component="small">
            {intl.formatMessage(successMessages.titleFooter)}
          </Content>
        </Content>
      </PageHeader>
      <PageSection hasBodyWrapper={false}>
        <Stack hasGutter>
          <StackItem>
            <Card>
              <CardBody>
                <Title headingLevel="h2" size="xl" className="pf-u-mb-md">
                  {intl.formatMessage(successMessages.installation)}
                </Title>
                <div
                  className="pf-u-display-flex pf-u-flex-wrap"
                  style={{ rowGap: '16px' }}
                >
                  <Flex className="pf-u-align-self-center pf-u-flex-grow-1 pf-u-flex-nowrap">
                    <div className="pf-u-mr-md">
                      <pfe-icon icon="rh-icon-install" size="lg" />
                    </div>
                    <div className="pf-u-align-self-center pf-u-flex-grow-1">
                      <Content>
                        <Button
                          icon={<DownloadIcon />}
                          className="pf-u-mb-md"
                          onClick={() => downloadTrial(ANSIBLE_CHECKSUM)}
                        >
                          {intl.formatMessage(successMessages.startDownload)}
                        </Button>
                        <Content component="p">
                          {intl.formatMessage(successMessages.downloadNote, {
                            a: (chunks) => (
                              <Link link="https://access.redhat.com/downloads/content/480">
                                {chunks}
                              </Link>
                            ),
                          })}
                        </Content>
                      </Content>
                    </div>
                  </Flex>
                  <Logo />
                </div>
                <Divider className="pf-u-my-lg" />
                <Requirements afterTrial />
                <Divider className="pf-u-my-lg" />
                <Content>
                  <Title headingLevel="h2" size="xl">
                    {intl.formatMessage(successMessages.nextSteps)}
                  </Title>
                  <div className="pf-u-display-flex pf-u-mb-lg">
                    <div className="pf-u-mr-md">
                      <Title
                        headingLevel="h2"
                        size="2xl"
                        className="ans-c-trial__number"
                      >
                        1
                      </Title>
                    </div>
                    <div style={{ flexGrow: 1, alignSelf: 'center' }}>
                      <Title headingLevel="h2" size="xl">
                        {intl.formatMessage(successMessages.deployAnsible)}
                      </Title>
                      <Content>
                        {intl.formatMessage(successMessages.deployAnsibleText, {
                          ul: (chunks) => (
                            <Content component="ul" className="pf-u-ml-0">{chunks}</Content>
                          ),
                          li: (chunks) => (
                            <Content component="li" className="pf-u-mt-0">
                              {chunks}
                            </Content>
                          ),
                          a: (chunks) => (
                            <Link link="https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.4/html/red_hat_ansible_automation_platform_installation_guide/index">
                              {chunks}
                            </Link>
                          ),
                          a1: (chunks) => (
                            <Link link="https://docs.ansible.com/automation-controller/latest/html/quickstart/index.html">
                              {chunks}
                            </Link>
                          ),
                          a2: (chunks) => (
                            <Link link="https://www.redhat.com/en/services/training/do007-ansible-essentials-simplicity-automation-technical-overview">
                              {chunks}
                            </Link>
                          ),
                        })}
                      </Content>
                    </div>
                  </div>
                  <div className="pf-u-display-flex">
                    <div className="pf-u-mr-md">
                      <Title
                        headingLevel="h2"
                        size="2xl"
                        className="ans-c-trial__number"
                      >
                        2
                      </Title>
                    </div>
                    <div style={{ flexGrow: 1, alignSelf: 'center' }}>
                      <Title headingLevel="h2" size="xl">
                        {intl.formatMessage(successMessages.learnAnsible)}
                      </Title>
                      <Content>
                        {intl.formatMessage(successMessages.learnAnsibleText, {
                          a: (chunks) => (
                            <Link link="https://www.redhat.com/en/technologies/management/ansible/features#automation-execution-environments">
                              {chunks}
                            </Link>
                          ),
                        })}
                      </Content>
                    </div>
                  </div>
                </Content>
              </CardBody>
            </Card>
          </StackItem>
          <StackItem>
            <Card>
              <CardBody className="pf-u-pb-0">
                <Title headingLevel="h2" size="xl">
                  {intl.formatMessage(successMessages.support)}
                </Title>
                <div className="pf-u-display-flex">
                  <div className="pf-u-mr-md">
                    <pfe-icon icon="rh-icon-support" size="lg" />
                  </div>
                  <div style={{ flexGrow: 1, alignSelf: 'center' }}>
                    <Content>
                      <Content component="p">
                        {intl.formatMessage(successMessages.supportText)}
                      </Content>
                    </Content>
                  </div>
                </div>
                <Divider className="pf-u-my-lg" />
                <Resources />
              </CardBody>
            </Card>
          </StackItem>
        </Stack>
      </PageSection>
    </>
  );
};

export default Success;
