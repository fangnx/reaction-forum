import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';

const initialState = {};
const middleware = [thunk];

const persistConfig = {
	key: 'root',
	storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
	persistedReducer,
	initialState,
	compose(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
