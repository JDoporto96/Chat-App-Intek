import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError, setInfo } from "../reducers/message";
import {t} from 'i18next';
import RESPOND_REQUEST from "../../graphql/mutations/respondContactRequest";
import GET_CONTACTS from "../../graphql/queries/getContacts";
import { setContacts } from "../reducers/getContacts";


export function* respondRequest(action){
    try{
        const input = action.payload.input;
        const res = yield call(client.mutate,{mutation: RESPOND_REQUEST,variables:{input}})
        const error = res.data.respondContactRequest.error;
     
        if(error){
            yield put (setError(t(error)))
           
        }else{
            const message = res.data.respondContactRequest.message;
            yield put (setInfo(t(message)))
            const res2 = yield call(client.query, {query:GET_CONTACTS, fetchPolicy: "no-cache"});
            const contacts = res2.data.getContacts;
         
            yield put(setContacts(contacts))
        }
    }catch(err){
        yield put (setError(t("Error on server")))
    }
}