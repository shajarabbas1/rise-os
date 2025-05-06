/* eslint-disable @typescript-eslint/no-explicit-any */
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../reducers/root-reducer';
import { rootSagaWorker } from '../saga-workers/root-saga-worker';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['someReducer'], // only persist someReducer
  // blacklist: ['someReducer'] // don't persist someReducer
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'user/loginRequest',
          'user/validateEmailRequest',
        ],
      },
    }).concat(sagaMiddleware),
});

// Create persistor
export const persistor = persistStore(store);

// Run the root saga
sagaMiddleware.run(rootSagaWorker);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
