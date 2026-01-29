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
import { useIntl } from 'react-intl';
import successMessages from '../../messages/success.messages';

const Resources = () => {
  const intl = useIntl();

  return (
    <>
      <Content>
        <Title headingLevel="h2" size="xl">
          {intl.formatMessage(successMessages.resources)}
        </Title>
        <Content component="p" className="pf-u-mb-lg">
          {intl.formatMessage(successMessages.resourcesDescription)}
        </Content>
      </Content>
      <Grid hasGutter>
        <GridItem md={6}>
          <Card  className="pf-u-px-md pf-u-h-100">
            <CardBody>
              {intl.formatMessage(successMessages.instructionsText)}
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
                {intl.formatMessage(successMessages.instructionsLink)}{' '}
                
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={6}>
          <Card  className="pf-u-px-md pf-u-h-100">
            <CardBody>
              {intl.formatMessage(successMessages.documentationText)}
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
                {intl.formatMessage(successMessages.documentationLink)}{' '}
                
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={6}>
          <Card  className="pf-u-px-md pf-u-h-100">
            <CardBody>
              {intl.formatMessage(successMessages.otherVersionsText)}
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
                {intl.formatMessage(successMessages.otherVersionsLink)}{' '}
                
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={6}>
          <Card  className="pf-u-px-md pf-u-h-100">
            <CardBody>
              {intl.formatMessage(successMessages.customerServiceText)}
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
                {intl.formatMessage(successMessages.customrServiceLink)}{' '}
                
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
          {intl.formatMessage(successMessages.faqLink)}
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
          {intl.formatMessage(successMessages.allTrials)}
        </Button>
      </div>
    </>
  );
};

export default Resources;
