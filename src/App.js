import '@patternfly/pfe-icon';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import React, { Suspense, useEffect, useState } from 'react';
// react-int eng locale data
import { IntlProvider } from 'react-intl';
import './App.scss';
import { Routes } from './Routes';
import AppPlaceholder from './components/shared/loader-placeholders';
import UserContext from './user-context';

const pathName = window.location.pathname.split('/');

pathName.shift();

const App = () => {
  const APPLICATION_NAME = 'automation-dashboard';

  const [userPermissions, setUserPermissions] = useState();
  const [userIdentity, setUserIdentity] = useState();

  const { updateDocumentTitle, auth, getUserPermissions } = useChrome();

  useEffect(() => {
    updateDocumentTitle(APPLICATION_NAME);
    auth.getUser().then((data) => setUserIdentity(data));
    getUserPermissions(APPLICATION_NAME).then((data) =>
      setUserPermissions(data),
    );
  }, []);

  if (!userIdentity) {
    return <AppPlaceholder />;
  }

  return (
    <UserContext.Provider
      value={{ permissions: userPermissions, userIdentity }}
    >
      <Suspense fallback={<AppPlaceholder />}>
        <IntlProvider locale="en">
          <>
            <NotificationsPortal />
            <section className="ans-c-dashboard pf-v5-c-page__main-section pf-v5-l-page__main-section pf-v5-u-p-0 pf-v5-u-ml-0">
              <Routes />
            </section>
          </>
        </IntlProvider>
      </Suspense>
    </UserContext.Provider>
  );
};

export default App;
