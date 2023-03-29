import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError } from "../reducers/message";
import {t} from 'i18next';
import DELETE_CONV from "../../graphql/mutations/deleteConv";

export function* deleteConv(action){
    try{
        const {conversationId} = action.payload;
        const res = yield call(client.mutate,{mutation: DELETE_CONV,variables:{conversationId}});
        const error = res.data.deleteConversation.error;
        if(error){
            yield put (setError(t(error)))
           
        }
    }catch(err){
        yield put (setError(t("Error on server")))
    }
}