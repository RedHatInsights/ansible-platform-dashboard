import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Content,
  Title,
} from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/dynamic/icons/arrow-right-icon';
import ExternalLinkIcon from '@patternfly/react-icons/dist/dynamic/icons/external-link-alt-icon';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

const resourceMessages = defineMessages({
  resources: {
    id: 'success.resources',
    defaultMessage: 'Helpful resources',
  },
  resourcesDescription: {
    id: 'success.resourcesDescription',
    defaultMessage:
      'To make the most of your product trial, check out these resources.',
  },
  instructionsText: {
    id: 'success.instructionsText',
    defaultMessage:
      'Get requirements and recommended steps for your installation.',
  },
  instructionsLink: {
    id: 'success.instructionsLink',
    defaultMessage: 'Read the installation instructions',
  },
  documentationText: {
    id: 'success.documentationText',
    defaultMessage:
      'Find release notes, planning recommendations, and other guidance for your trial.',
  },
  documentationLink: {
    id: 'success.documentationLink',
    defaultMessage: 'Browse product documentation',
  },
  otherVersionsText: {
    id: 'success.otherVersionsText',
    defaultMessage:
      "Find other versions and images of the Red Hat product you're trying.",
  },
  otherVersionsLink: {
    id: 'success.otherVersionsLink',
    defaultMessage: 'Access other downloads',
  },
  customerServiceText: {
    id: 'success.customerServiceText',
    defaultMessage:
      "Get answers to questions about your trial or Red Hat products. (Note: Customer Service doesn't provide break/fix or triage support for self-supported product trials.)",
  },
  customerServiceLink: {
    id: 'success.customrServiceLink',
    defaultMessage: 'Contact Customer Service',
  },
  faqLink: {
    id: 'success.faqLink',
    defaultMessage: 'See product trial FAQs',
  },
  allTrials: {
    id: 'success.allTrials',
    defaultMessage: 'See all product trials',
  },
});

const Resources = () => {
  const intl = useIntl();

  return (
    <>
      <Content>
        <Title headingLevel="h2" size="xl">
          {intl.formatMessage(resourceMessages.resources)}
        </Title>
        <Content component="p" className="pf-u-mb-lg">
          {intl.formatMessage(resourceMessages.resourcesDescription)}
        </Content>
      </Content>
      <Grid hasGutter>
        <GridItem md={6}>
          <Card  className="pf-u-px-md pf-u-h-100">
            <CardBody>
              {intl.formatMessage(resourceMessages.instructionsText)}
            </CardBody>
            <CardFooter>
              <Button icon={<ArrowRightIcon />}
                variant="link"
                size="lg"
                isInline
                component="a"
                href="https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.4/html/red_hat_ansible_automation_platform_installation_guide/index"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage(resourceMessages.instructionsLink)}{' '}

              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={6}>
          <Card  className="pf-u-px-md pf-u-h-100">
            <CardBody>
              {intl.formatMessage(resourceMessages.documentationText)}
            </CardBody>
            <CardFooter>
              <Button icon={<ArrowRightIcon />}
                variant="link"
                size="lg"
                isInline
                component="a"
                href="https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage(resourceMessages.documentationLink)}{' '}

              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={6}>
          <Card  className="pf-u-px-md pf-u-h-100">
            <CardBody>
              {intl.formatMessage(resourceMessages.otherVersionsText)}
            </CardBody>
            <CardFooter>
              <Button icon={<ArrowRightIcon />}
                variant="link"
                size="lg"
                isInline
                component="a"
                href="https://access.redhat.com/downloads/content/480"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage(resourceMessages.otherVersionsLink)}{' '}

              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={6}>
          <Card  className="pf-u-px-md pf-u-h-100">
            <CardBody>
              {intl.formatMessage(resourceMessages.customerServiceText)}
            </CardBody>
            <CardFooter>
              <Button icon={<ArrowRightIcon />}
                variant="link"
                size="lg"
                isInline
                component="a"
                href="https://www.redhat.com/en/contact/customer-service?contact=customer-service#tab.contact-method.1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage(resourceMessages.customerServiceLink)}{' '}

              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
      <div className="pf-u-my-2xl ans-c-trial__resources-button">
        <Button
          variant="tertiary"
          icon={<ExternalLinkIcon />}
          iconPosition="right"
          component="a"
          href="https://www.redhat.com/en/products/trials/faqs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {intl.formatMessage(resourceMessages.faqLink)}
        </Button>
        <Button
          variant="tertiary"
          icon={<ExternalLinkIcon />}
          iconPosition="right"
          component="a"
          href="https://www.redhat.com/en/products/trials"
          target="_blank"
          rel="noopener noreferrer"
        >
          {intl.formatMessage(resourceMessages.allTrials)}
        </Button>
      </div>
    </>
  );
};

export default Resources;
