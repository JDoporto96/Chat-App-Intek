import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError, setInfo } from "../reducers/message";
import {t} from 'i18next';
import CREATE_GROUP_CONV from "../../graphql/mutations/createGroup";
import { setGroups } from "../reducers/conversations";

export function* createGroup(action){
    try{
        const input = action.payload.input;
        const res = yield call(client.mutate,{mutation: CREATE_GROUP_CONV,variables:{input}});
        const error = res.data.createGroup.error;
        if(error){
            yield put (setError(t(error)))
           
        }else{
            
            const message = res.data.createGroup.message;
            yield put (setInfo(t(message)))



        }
    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
    }
}