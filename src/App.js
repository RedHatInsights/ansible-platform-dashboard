import React, { useState, useEffect, Suspense } from 'react';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { Routes } from './Routes';
// react-int eng locale data
import { IntlProvider } from 'react-intl';
import UserContext from './user-context';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';


import './App.scss';
import '@patternfly/pfe-icon';

import AppPlaceholder from './components/shared/loader-placeholders';

const pathName = window.location.pathname.split('/');

pathName.shift();

const App = () => {
  let APPLICATION_NAME = 'automation-dashboard';

  const [ userPermissions, setUserPermissions ] = useState();
  const [ userIdentity, setUserIdentity ] = useState();

  const { updateDocumentTitle, auth, getUserPermissions } = useChrome();

  useEffect(() => {
    updateDocumentTitle(APPLICATION_NAME);
    auth.getUser().then((data) => setUserIdentity(data));
    getUserPermissions(APPLICATION_NAME).then((data) => setUserPermissions(data))
  }, []);

  if (!userIdentity) {
    return <AppPlaceholder />;
  };

  return (
    <UserContext.Provider
      value={ { permissions: userPermissions , userIdentity  }}
    >
      <Suspense fallback={ <AppPlaceholder /> }>
        <IntlProvider locale="en">
          <React.Fragment>
            <NotificationsPortal />
            <section className="ans-c-dashboard pf-u-p-0 pf-u-ml-0">
              <Routes />
            </section>
          </React.Fragment>
        </IntlProvider>
      </Suspense>
    </UserContext.Provider>
  );
};

export default App;
