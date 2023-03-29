import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError } from "../reducers/message";
import {t} from 'i18next';
import { setGroups } from "../reducers/conversations";
import CREATE_CONV from "../../graphql/mutations/createConversation";

export function* createConversation(action){
    try{
        const receiverId = action.payload.receiverId;
        const res = yield call(client.mutate,{mutation: CREATE_CONV,variables:{receiverId}});
        const error = res.data.createConversation.error;
        if(error){
            yield put (setError(t(error)))
           
        }
    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
    }
}



