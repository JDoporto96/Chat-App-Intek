import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError, setInfo } from "../reducers/message";
import {t} from 'i18next';
import REMOVE_CONTACT from "../../graphql/mutations/removeContact";
import GET_CONTACTS from "../../graphql/queries/getContacts";
import { setContacts } from "../reducers/getContacts";


export function* removeContact(action){
    try{
        const contactId = action.payload.contactId;
        const res = yield call(client.mutate,{mutation: REMOVE_CONTACT,variables:{contactId}})
        const error = res.data.removeContact.error;
        if(error){
            yield put (setError(t(error)))
           
        }else{
            const message = res.data.removeContact.message;
            yield put (setInfo(t(message)))
            const res2 = yield call(client.query, {query:GET_CONTACTS, fetchPolicy: "no-cache"});
            const contacts = res2.data.getContacts;
         
            yield put(setContacts(contacts))
        }
    }catch(err){
        yield put (setError(t("Error on server")))
    }
}