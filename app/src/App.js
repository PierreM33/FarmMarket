import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import {persistor, store} from "./Redux/store/configureStore";
import FarmMarket from "./FarmMarket";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <FarmMarket />
        </PersistGate>
      </Provider>
  );
}

export default App;
