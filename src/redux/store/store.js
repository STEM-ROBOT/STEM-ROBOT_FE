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
import { addCompetitionFormatReducer, getCompetitionInfoReducer, getCompetitionModeratorReducer } from '../reducers/CompetitionReducer';
import { createRefereeReducer, getFreeTimeRefereeReducer, getRefereeReducer } from '../reducers/RefereeReducer';
import { importRuleReducer } from '../reducers/RuleReducer';
import { addScoreReducer } from '../reducers/ScoreReducer';
import { addTeamAssignMatchReducer, addTeamKnockoutReducer, addTeamTableReducer, addTimeAssignMatchReducer, getTeamAssignMatchReducer, getTeamknockoutReducer, getTeamMatchReducer, getTeamsReducer, getTeamTableReducer } from '../reducers/TeamReducer';
import { addLoctionReducer, getLoctionReducer } from '../reducers/LocationReducer';

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
    getFreetimeReferee:getFreeTimeRefereeReducer,
    addCompetitionFormat:addCompetitionFormatReducer,
    addTeamknockout:addTeamKnockoutReducer,
    getTeamknockout:getTeamknockoutReducer,
    getTeamTable:getTeamTableReducer,
    addTeamTable:addTeamTableReducer,
    getListTeamMatch:getTeamMatchReducer,
    getLocations:getLoctionReducer,
    addLocation:addLoctionReducer,
    getTeamAssignMatch:getTeamAssignMatchReducer,
    addTeamAssignMatch:addTeamAssignMatchReducer,
    addTimeAssignMatch:addTimeAssignMatchReducer,
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