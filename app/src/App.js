import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import {persistor, store} from "./Redux/store/configureStore";
import MyWebSite from "./MyWebSite";

function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MyWebSite />
        </PersistGate>
      </Provider>
  );
}

export default App;
