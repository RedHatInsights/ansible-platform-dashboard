import React, { lazy } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Error404 from './components/shared/error-404';
import {
  DASHBOARD_ROUTE,
  TRIAL_EXPIRED_ROUTE,
  TRIAL_ROUTE,
  TRIAL_SUCCESS_ROUTE,
} from './constants/routes';

const Dashboard = lazy(() => import('./components/dashboard/dashboard'));
const TrialOverview = lazy(() => import('./components/trial/overview'));
const TrialSuccess = lazy(() => import('./components/trial/success'));
const TrialExpired = lazy(() => import('./components/trial/expired'));

export const Routes = () => (
  <RouterRoutes>
    <Route path={TRIAL_SUCCESS_ROUTE} element={<TrialSuccess />} />
    <Route path={TRIAL_EXPIRED_ROUTE} element={<TrialExpired />} />
    <Route path={TRIAL_ROUTE} element={<TrialOverview />} />
    <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
    <Route path={'*'} element={<Error404 />} />
  </RouterRoutes>
);
