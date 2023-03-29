import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError } from "../reducers/message";
import {t} from 'i18next';
import DELETE_GROUP_CONV from "../../graphql/mutations/deleteGroup";
import { setGroups } from "../reducers/conversations";

export function* deleteGroup(action){
    try{
        const conversationId = action.payload.conversationId;
      
        const res = yield call(client.mutate,{mutation: DELETE_GROUP_CONV,variables:{conversationId}});
        const error = res.data.deleteGroup.error;
        if(error){
            yield put (setError(t(error)))
           
        }
    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
    }
}