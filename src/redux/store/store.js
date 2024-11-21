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
import { activeCompetitionReducer, addCompetitionFormatReducer, getCompetitionInfoReducer, getCompetitionModeratorReducer } from '../reducers/CompetitionReducer';
import { addScheduleRefereeReducer, createRefereeReducer, getFreeTimeRefereeReducer, getRefereeReducer, getScheduleRefereeReducer } from '../reducers/RefereeReducer';
import { getRuleReducer, importRuleReducer } from '../reducers/RuleReducer';
import { addScoreReducer, getScoreReducer } from '../reducers/ScoreReducer';
// import {  getTeamknockoutReducer, getTeamMatchReducer, getTeamsReducer, getTeamTableReducer } from '../reducers/TeamReducer';
import { getLoctionReducer } from '../reducers/LocationReducer';
import { ListAccountReducer, ListGenreReducer, ListOrderReducer } from '../reducers/AdminReducer';
import {  ChangeInforReducer, ChangePassword, InforAccountID } from '../reducers/AccountReducer';
import { addTeamAssignMatchReducer, addTeamKnockoutReducer, addTeamTableReducer, addTimeAssignMatchReducer, getTeamAssignMatchReducer, getTeamknockoutReducer, getTeamMatchReducer, getTeamRegisterReducer, getTeamsReducer, getTeamTableReducer, updateTeamRegisterReducer } from '../reducers/TeamReducer';
import { addLoctionReducer } from '../reducers/LocationReducer';
import { getActiveCompetitionReducer } from '../reducers/FormatReducer';

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
    getTeamTable:getTeamTableReducer,
    addTeamTable:addTeamTableReducer,
    getListTeamMatch:getTeamMatchReducer,
    getLocations:getLoctionReducer,
    getListAccount:ListAccountReducer,
    getListGenre : ListGenreReducer,
    getListOrder:ListOrderReducer,
    getAccountID : InforAccountID,
    ChangePassword : ChangePassword,
    ChangeInfor : ChangeInforReducer,
    addLocation:addLoctionReducer,
    getTeamAssignMatch:getTeamAssignMatchReducer,
    addTeamAssignMatch:addTeamAssignMatchReducer,
    addTimeAssignMatch:addTimeAssignMatchReducer,
    getActiveFormat:getActiveCompetitionReducer,
    getTeamknockout:getTeamknockoutReducer,
    addScheduleReferee:addScheduleRefereeReducer,
    getScheduleReferee:getScheduleRefereeReducer,
    activeCompetition:activeCompetitionReducer,
    getTeamRegister:getTeamRegisterReducer,
    updateTeamRegister:updateTeamRegisterReducer,
    getRule:getRuleReducer,
    getScore:getScoreReducer,
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