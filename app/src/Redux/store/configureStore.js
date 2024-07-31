import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { AppState } from "../reducers/appReducer";
import { Logger } from "../reducers/authReducer";

const persistConfig = {
    key: "ExpeditionWars",
    storage: AsyncStorage
};

const rootReducer = combineReducers({
    Logger,
    AppState
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Peut être nécessaire pour les configurations persistantes
        })
    // Ajoutez d'autres middlewares ici si nécessaire
});

export const persistor = persistStore(store);
