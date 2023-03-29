import { call, put, takeEvery } from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import GET_CONTACTS from "../../graphql/queries/getContacts";
import { setContacts, setContactsFetched } from "../reducers/getContacts";
import { getContacts } from "./getContactsSaga";
import { getCurrentUser } from "./getCurrentUserSaga";
import { getUserConversations } from "./getUserConversationsSaga";


export function* loginBundleSaga(){
    try{
        yield getContacts();
        yield getCurrentUser();
        yield getUserConversations();

        
    }catch(err){
        console.log(err)
    }

}