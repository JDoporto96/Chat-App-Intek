import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import authReducer from './reducers/login';
import userReducer from './reducers/getCurrentUser';
import contactsReducer from './reducers/getContacts';
import infoMessageReducer from './reducers/message';
import convsReducer from './reducers/conversations';
import rootSaga from './sagas';

const configureAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];

    const store = configureStore({
        reducer: {
            auth:authReducer,
            currentUser:userReducer,
            contacts:contactsReducer,
            infoMessage:infoMessageReducer,
            conversations:convsReducer,
        },
        middleware: (getDefaultMiddleware) => {
            const middleware = [
                ...getDefaultMiddleware({ thunk: false }),
                ...middlewares,
            ];

            return middleware;
        },
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureAppStore;