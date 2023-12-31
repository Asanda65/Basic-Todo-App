import { createStore, combineReducers, applyMiddleware } from 'redux';
import { todos, isLoading } from './todos/reducers';
import { persistReducer } from 'redux-persist';
import Storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = {
    todos,
    isLoading,
};

const persistConfig = {
    key: 'root',
    storage: Storage,
    stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () =>
    createStore(
        persistedReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );
