import notificationsMiddleware, {
  notificationsReducer,
} from '../notificationsShim';
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
    notificationsMiddleware({
      errorTitleKey: ['errors', 'message', 'statusText'],
      errorDescriptionKey: [
        'data.errors[0].detail',
        'data.errors',
        'data.error',
        'data.message',
        'response.body.errors',
        'data',
        'errorMessage',
        'stack',
      ],
    }),
    ...middlewares,
  ]);

  registry.register({
    analyticsReducer: applyReducerHash(analyticsReducer, analyticsInitialState),
    hubReducer: applyReducerHash(hubReducer, hubInitialState),
    notifications: notificationsReducer,
  });

  return registry.getStore();
};

export default getStore;
