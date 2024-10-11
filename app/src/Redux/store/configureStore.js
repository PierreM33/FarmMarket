import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { Logger } from "../reducers/authReducer";

const persistConfig = {
    key: "FarmMarket",
    storage: AsyncStorage
};

const rootReducer = combineReducers({
    Logger
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })

});

export const persistor = persistStore(store);
