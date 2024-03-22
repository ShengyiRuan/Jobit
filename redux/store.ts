import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./feature/theme/themeSlice";
import salariesInputsReducer from "./feature/salariesInputs/salariesInputsSlice";
import searchJobsReducer from "@/redux/feature/searchJobs/searchJobs";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// NOTE - Source: https://mightycoders.xyz/redux-persist-failed-to-create-sync-storage-falling-back-to-noop-storage
// Regarding an error that occurs when using redux-persist with Next.js
// The error was 'redux-persist failed to create sync storage. falling back to noop storage.'
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  // NOTE source 1: https://github.com/rt2zz/redux-persist#blacklist--whitelist
  // NOTE source 2: Yilmaz's answer https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit
  whitelist: ["theme", "salariesInputs"],
};

const reducers = combineReducers({
  theme: themeSlice,
  salariesInputs: salariesInputsReducer,
  searchJobs: searchJobsReducer,
  // NOTE Add more reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // NOTE - Source: https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk (See "Use with Redux-Persist" section)
  // NOTE - Source: https://www.youtube.com/watch?v=b88Z5POQBwI
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
