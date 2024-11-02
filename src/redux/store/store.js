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
import { createContestantReducer, getContestantReducer } from '../reducers/ContestantReducer';
import { LoginReducer } from '../reducers/AuthenReducer';
import { createTournamentInfoReducer, getTournamentInfoReducer, getTournamentModeratorReducer } from '../reducers/TournamentReducer';
import { getCompetitionInfoReducer, getCompetitionModeratorReducer } from '../reducers/CompetitionReducer';
import { createRefereeReducer, getRefereeReducer } from '../reducers/RefereeReducer';
import { importRuleReducer } from '../reducers/RuleReducer';
import { addScoreReducer } from '../reducers/ScoreReducer';
import { getTeamsReducer } from '../reducers/TeamReducer';

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
    getReferee:getRefereeReducer,
    addContestant:createContestantReducer,
    addReferee:createRefereeReducer,
    addRule:importRuleReducer,
    addScore:addScoreReducer,
    getTeams:getTeamsReducer,

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