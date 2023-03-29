import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError} from "../reducers/message";
import {t} from 'i18next';
import GET_USER_CONV from "../../graphql/queries/getUserConversations";
import { setConversations, setConvsFetched, setGroups } from "../reducers/conversations";
import GET_USER_GROUPS from "../../graphql/queries/getGroups";

export function* getUserConversations(action){
    try{
        const res = yield call(client.query, {query:GET_USER_CONV, fetchPolicy: 'no-cache'});
        const convs = res.data.getUserConversations;
        yield put(setConversations(convs))

        const res2 = yield call(client.query, {query:GET_USER_GROUPS, fetchPolicy: 'no-cache'});
        const groups = res2.data.getUserGroups;
        yield put(setGroups(groups))

        yield put(setConvsFetched());

    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
        yield put(setConversations([]))
    }

}