"use client";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";

type ReduxProviderType = {
  children: ReactNode;
};

function ReduxProvider({ children }: ReduxProviderType) {
  return (
    <Provider store={store}>
      {/* // NOTE - Source: https://www.youtube.com/watch?v=b88Z5POQBwI */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;
