import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getContestantReducer } from '../reducers/ContestantReducer';
import { LoginReducer } from '../reducers/AuthenReducer';
import { createTournamentInfoReducer, getTournamentInfoReducer, getTournamentModeratorReducer } from '../reducers/TournamentReducer';
import { getCompetitionInfoReducer, getCompetitionModeratorReducer } from '../reducers/CompetitionReducer';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    userLogin: LoginReducer,
    getContestants: getContestantReducer,
    infoTournament:getTournamentInfoReducer,
    infoCompetition:getCompetitionInfoReducer,
    createTournamnet:createTournamentInfoReducer,
    getTournamentList:getTournamentModeratorReducer,
    getCompetition:getCompetitionModeratorReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER],
            },
        }),
})

export let persistor = persistStore(store);