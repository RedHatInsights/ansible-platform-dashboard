import ReducerRegistry, {
  applyReducerHash,
} from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import analyticsReducer, {
  analyticsInitialState,
} from '../redux/reducers/analytics-reducer';
import hubReducer, { hubInitialState } from '../redux/reducers/hub-reducer';

const getStore = (middlewares = []) => {
  const registry = new ReducerRegistry({}, [
    thunk,
    promiseMiddleware,
    ...middlewares,
  ]);

  registry.register({
    analyticsReducer: applyReducerHash(analyticsReducer, analyticsInitialState),
    hubReducer: applyReducerHash(hubReducer, hubInitialState),
  });

  return registry.getStore();
};

export default getStore;
