import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError, setInfo } from "../reducers/message";
import {t} from 'i18next';
import UPDATE_GROUP from "../../graphql/mutations/updateGroup";
import GET_USER_CONV from "../../graphql/queries/getUserConversations";
import GET_USER_GROUPS from "../../graphql/queries/getGroups";
import { setConversations, setConvsFetched, setGroups } from "../reducers/conversations";

export function* updateGroup(action){
    try{
        const input = action.payload.input;
        const res = yield call(client.mutate,{mutation: UPDATE_GROUP,variables:{input}});
        const error = res.data.updateGroup.error;
        if(error){
            yield put (setError(t(error)))
           
        }else{
            
            const message = res.data.updateGroup.message;
            yield put (setInfo(t(message)))

           
            const res2 = yield call(client.query, {query:GET_USER_CONV, fetchPolicy: 'no-cache'});
            const convs = res2.data.getUserConversations;
            yield put(setConversations(convs))
    
            const res3 = yield call(client.query, {query:GET_USER_GROUPS, fetchPolicy: 'no-cache'});
            const groups = res3.data.getUserGroups;
            yield put(setGroups(groups))
    
            yield put(setConvsFetched());



        }
    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
    }
}