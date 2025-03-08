'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import todoReducer from './todoSlice';

const persistConfig = {
key: 'root',
storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Conditionally initialize persistStore (avoids issues with SSR)
export const persistor = typeof window !== 'undefined' ? persistStore(store) : null;
