import { applyMiddleware, createStore } from 'redux';
import {persistReducer,persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {name as appName} from '../../app.json';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key:`${appName}-storage`,
    storage:AsyncStorage,
}

const persist = persistReducer(persistConfig,rootReducer);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(persist);
export const persistor = persistStore(store);
