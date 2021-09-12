//REDUX-TOOLKIT
import { configureStore } from '@reduxjs/toolkit';
import darkSliceReducer from './darkSlice';
import isLoadingSliceReducer from './isLoadingSlice';
import isConfirmedSignupSliceReducer from './isConfirmedSignupSlice';
import holdUsernameSignupSliceReducer from './holdUsernameSignupSlice';
import isUserSignedinSliceReducer from './isUserSignedinSlice';
import holdNameOfUserUntilSignedInSliceReducer from './holdNameOfUserUntilSignedInSlice';
import holdIdOfUserUntilSignedInSliceReducer from './holdIdOfUserUntilSignedInSlice';
//REDUX-PERSIST
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';  /*middleware loges redux on console*/





//REDUX
//************************************************************************************
import { combineReducers } from 'redux';
//created seperate 'rootReducer' because of REDUX-PERSIST usage requirement
    const rootReducer = combineReducers({
        darkSliceReducer,
        isLoadingSliceReducer,
        isConfirmedSignupSliceReducer,
        holdUsernameSignupSliceReducer,
        isUserSignedinSliceReducer,
        holdNameOfUserUntilSignedInSliceReducer,
        holdIdOfUserUntilSignedInSliceReducer
    });
//************************************************************************************





//REDUX-PERSIST
//************************************************************************************
    const persistConfig = {
        key: 'root',
        storage,
    //  whitelist: ['', '']    //only these reducer's value will persist
    //  blacklist: ['', '']    //only these reducer's value wont persist
    //                         //each & all reducer's value will persist
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    export const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)  /*removes error*/
    });
    export const persistor = persistStore(store);
    export default { store, persistor };
//************************************************************************************





//INTRODUCTION
//https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f
//USE WITH REDUX-TOOLKIT
//https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit
//FIXED ERROR
//https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
//NOT WRAP IN 'PersistGate'
//https://edisondevadoss.medium.com/how-to-use-redux-persist-in-react-application-35943c1d8292