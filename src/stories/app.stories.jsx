import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { App } from '../App';

const mockStore = configureStore([]);

export default {
  title: 'App',
};

export const unauthenticated = () => {
  const unauthenticatedStore = mockStore({
    sessionState: {
      loading: false,
      authUser: null,
    },
    recurrencesState: {
      loading: false,
    },
    form: {
      selectingFormValues: {},
    },
  });

  return (
    <Provider store={unauthenticatedStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export const authenticated = () => {
  const authenticatedStore = mockStore({
    sessionState: {
      loading: false,
      authUser: 1234,
    },
    recurrencesState: {
      loading: false,
    },
    form: {
      selectingFormValues: {
        values: {
          loading: false,
          startDate: '2019-12-20T20:05:27.414Z',
          endDate: '2020-01-22T20:05:27.414Z',
          initialBalance: '100',
          income: [
            {
              type: 'incoming',
              recurrenceDate: 2,
              regularity: 'WEEKLY',
              description: 'WAGES1',
              cost: '20',
            },
          ],
          outcome: [
            {
              type: 'outgoing',
              regularity: 'DAILY',
              description: 'Lunch',
              cost: '2',
            },
            {
              type: 'outgoing',
              recurrenceDate: 15,
              regularity: 'MONTHLY',
              description: 'Spotify',
              cost: '15',
            },
          ],
        },
      },
    },
  });

  return (
    <Provider store={authenticatedStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};
