import React, { lazy } from 'react';

import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { DASHBOARD_ROUTE, TRIAL_EXPIRED_ROUTE, TRIAL_ROUTE, TRIAL_SUCCESS_ROUTE } from './constants/routes';
import Error404 from './components/shared/error-404';

const Dashboard = lazy(() => import(/* webpackChunkName: 'ansible-dashboard-route' */ './components/dashboard/dashboard'));
const TrialOverview = lazy(() => import(/* webpackChunkName: 'ansible-dashboard-route' */ './components/trial/overview'));
const TrialSuccess = lazy(() => import(/* webpackChunkName: 'ansible-dashboard-route' */ './components/trial/success'));
const TrialExpired = lazy(() => import(/* webpackChunkName: 'ansible-dashboard-route' */ './components/trial/expired'));

export const Routes = () => <RouterRoutes>
  <Route path={ TRIAL_SUCCESS_ROUTE } element={ <TrialSuccess /> }/>
  <Route path={ TRIAL_EXPIRED_ROUTE } element={ <TrialExpired  />}/>
  <Route path={ TRIAL_ROUTE } element={ <TrialOverview />}/>
  <Route path={ DASHBOARD_ROUTE } element={ <Dashboard/> }/>
  <Route path={ '*' } element={ <Error404/> }/>
</RouterRoutes>;
