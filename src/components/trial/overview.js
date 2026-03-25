import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  Button,
  Card,
  CardTitle,
  PageSection,
  Stack,
  StackItem,
  Content,
  Title,
} from '@patternfly/react-core';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import messages from '../../messages/messages';
import trialMessages from '../../messages/trial.messages';
import DashboardHeader from '../shared/dashboard-header';
import Link from './link';

const TRIAL_URL = 'https://www.redhat.com/en/products/trials#ansible';

const Overview = () => {
  const [activeFaq, openFaq] = useState();
  const intl = useIntl();

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
            <Button className="pf-u-px-xl" component="a" href={TRIAL_URL} target="_blank" rel="noopener noreferrer">
              {intl.formatMessage(trialMessages.startButton)}
            </Button>
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
              {createAccordionItem(2, {
                p: (chunks) => <Content component="p">{chunks}</Content>,
                a: (chunks) => (
                  <Link link="https://www.redhat.com/en/products/trials">
                    {chunks}
                  </Link>
                ),
                a1: (chunks) => (
                  <Link link="http://www.redhat.com/en/about/contact/sales">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(3)}
              {createAccordionItem(4, {
                a: (chunks) => (
                  <Link link="https://www.redhat.com/en/about/agreements">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(5, {
                p: (chunks) => <Content component="p">{chunks}</Content>,
                ul: (chunks) => <Content component="ul">{chunks}</Content>,
                li: (chunks) => <Content component="li">{chunks}</Content>,
                a1: (chunks) => (
                  <Link link="https://access.redhat.com/management/subscriptions">
                    {chunks}
                  </Link>
                ),
                a2: (chunks) => (
                  <Link link="https://www.redhat.com/en/products/trials/my-trials">
                    {chunks}
                  </Link>
                ),
                a3: (chunks) => (
                  <Link link="http://www.redhat.com/en/about/contact/sales">
                    {chunks}
                  </Link>
                ),
                a4: (chunks) => (
                  <Link link="https://www.redhat.com/en/contact/customer-service">
                    {chunks}
                  </Link>
                ),
                a5: (chunks) => (
                  <Link link="https://access.redhat.com/documentation/en-US/">
                    {chunks}
                  </Link>
                ),
                a6: (chunks) => (
                  <Link link="https://access.redhat.com/search/#/">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(6, {
                a: (chunks) => (
                  <Link link="https://www.redhat.com/en/products/trials/my-trials">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(7, {
                p: (chunks) => <Content component="p">{chunks}</Content>,
              })}
              {createAccordionItem(8, {
                a: (chunks) => (
                  <Link link="https://www.redhat.com/en/products/trials">
                    {chunks}
                  </Link>
                ),
                a1: (chunks) => (
                  <Link link="http://www.redhat.com/en/about/contact/sales">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(9, {
                p: (chunks) => <Content component="p">{chunks}</Content>,
                ol: (chunks) => <Content component="ol">{chunks}</Content>,
                li: (chunks) => <Content component="li">{chunks}</Content>,
                a: (chunks) => (
                  <Link link="http://www.redhat.com/en/about/contact/sales">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(10, {
                a: (chunks) => (
                  <Link link="http://www.redhat.com/en/about/contact/sales">
                    {chunks}
                  </Link>
                ),
              })}
              {createAccordionItem(11, {
                ul: (chunks) => <Content component="ul">{chunks}</Content>,
                li: (chunks) => <Content component="li">{chunks}</Content>,
                a: (chunks) => (
                  <Link link="http://www.redhat.com/en/about/contact/sales">
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
