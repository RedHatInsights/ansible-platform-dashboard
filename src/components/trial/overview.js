import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  PageSection,
  Stack,
  StackItem,
  Content,
  Title,
} from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/dynamic/icons/check-circle-icon';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import trialMessages from '../../messages/trial.messages';
import DashboardHeader from '../shared/dashboard-header';
import { BETA_TRIAL_PAGE, TRIAL_PAGE } from './constants';
import Link from './link';
import Requirements from './requirements';

const Overview = () => {
  const [activeFaq, openFaq] = useState();
  const intl = useIntl();

  const url = insights.chrome.isBeta() ? BETA_TRIAL_PAGE : TRIAL_PAGE;

  const onClick = (index) => () =>
    activeFaq === index ? openFaq(undefined) : openFaq(index);

  const createAccordionItem = (index, values) => (
    <AccordionItem isExpanded={activeFaq === index}>
      <AccordionToggle
        
        onClick={onClick(index)}
      >
        {intl.formatMessage(trialMessages[`faq${index}a`])}
      </AccordionToggle>
      <AccordionContent >
        <Content>
          {intl.formatMessage(trialMessages[`faq${index}b`], values)}
        </Content>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <>
      <DashboardHeader
        title={intl.formatMessage(messages.overview)}
        description={''}
      />
      <PageSection hasBodyWrapper={false} className="pf-u-pt-0 pf-u-mt-xs">
        <Stack hasGutter="md">
          <StackItem className="ans-c-trial__hero pf-u-pt-xl pf-u-pb-xl pf-u-pl-md pf-u-mb-0">
            <Title headingLevel="h1" size="xl" className="pf-u-mb-md">
              {intl.formatMessage(trialMessages.header)}
            </Title>
            <Content className="pf-u-mb-lg ans-c-trial__hero__description">
              <Content component="p">{intl.formatMessage(trialMessages.description)}</Content>
            </Content>
            <Button className="pf-u-px-xl" component="a" href={url}>
              {intl.formatMessage(trialMessages.startButton)}
            </Button>
          </StackItem>
          <StackItem>
            <Card>
              <CardTitle>
                {intl.formatMessage(trialMessages.adCardHeader)}
              </CardTitle>
              <CardBody>
                <Stack hasGutter>
                  {intl.formatMessage(trialMessages.adCardContent, {
                    li: (chunks) => (
                      <StackItem>
                        <div className="pf-u-display-flex">
                          <div>
                            <CheckCircleIcon
                              className="pf-u-mr-lg"
                              size="lg"
                              color="var(--pf-global--success-color--100)"
                            />
                          </div>
                          <div style={{ flexGrow: 1, alignSelf: 'center' }}>
                            <Content component="p">{chunks}</Content>
                          </div>
                        </div>
                      </StackItem>
                    ),
                  })}
                </Stack>
              </CardBody>
              <CardFooter>
                <Content>
                  <Content component="small">
                    {intl.formatMessage(trialMessages.adCardFooter, {
                      a: (chunks) => (
                        <Content
                          component="a"
                          href={`${window.location.origin}${window.location.pathname}#trial-terms`}
                        >
                          {chunks}
                        </Content>
                      ),
                    })}
                  </Content>
                </Content>
              </CardFooter>
            </Card>
          </StackItem>
          <StackItem>
            <Card>
              <CardBody>
                <Requirements />
              </CardBody>
            </Card>
          </StackItem>
          <StackItem>
            <Card>
              <CardTitle>
                {intl.formatMessage(trialMessages.faqTitle)}
              </CardTitle>
            </Card>
            <Accordion isBordered displaySize="lg">
              {createAccordionItem(1, {
                a: (chunks) => (
                  <Link link="https://access.redhat.com">{chunks}</Link>
                ),
              })}
              {createAccordionItem(2)}
              {createAccordionItem(3, {
                p: (chunks) => <Content component="p">{chunks}</Content>,
                ul: (chunks) => <Content component="ul">{chunks}</Content>,
                li: (chunks) => <Content component="li">{chunks}</Content>,
                a: (chunks) => (
                  <Link link="https://docs.redhat.com/en/products">
                    {chunks}
                  </Link>
                ),
                a1: (chunks) => (
                  <Link link="https://access.redhat.com/search/">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(4)}
              {createAccordionItem(5)}
              {createAccordionItem(6, {
                a: (chunks) => (
                  <Link link="https://www.redhat.com/en/products/trials">
                    {chunks}
                  </Link>
                ),
                a1: (chunks) => (
                  <Link link="http://www.redhat.com/en/contact">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(7, {
                p: (chunks) => <Content component="p">{chunks}</Content>,
                ol: (chunks) => <Content component="ol">{chunks}</Content>,
                li: (chunks) => <Content component="li">{chunks}</Content>,
                a: (chunks) => (
                  <Link link="http://www.redhat.com/en/contact">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(8, {
                a: (chunks) => (
                  <Link link="http://www.redhat.com/en/contact">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(9, {
                ul: (chunks) => <Content component="ul">{chunks}</Content>,
                li: (chunks) => <Content component="li">{chunks}</Content>,
                a: (chunks) => (
                  <Link link="http://www.redhat.com/en/contact">
                    {chunks}
                  </Link>
                ),
              })}
            </Accordion>
          </StackItem>
          <StackItem className="pf-u-mt-md pf-u-p-md">
            <Title
              headingLevel="h2"
              size="xl"
              className="pf-u-mb-lg"
              id="trial-terms"
            >
              {intl.formatMessage(trialMessages.footerTitle)}
            </Title>
            <Content className="pf-u-font-size-sm">
              {intl.formatMessage(trialMessages.footerContent, {
                p: (chunks) => <Content component="p">{chunks}</Content>,
                ul: (chunks) => (
                  <Content component="ul" className="pf-u-ml-0">{chunks}</Content>
                ),
                li: (chunks) => <Content component="li">{chunks}</Content>,
              })}
            </Content>
          </StackItem>
        </Stack>
      </PageSection>
    </>
  );
};

export default Overview;
