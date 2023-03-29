import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setContacts, setContactsFetched } from "../reducers/getContacts";
import GET_CONTACTS from "../../graphql/queries/getContacts";

export function* getContacts(action){
    try{
        const res = yield call(client.query, {query:GET_CONTACTS, fetchPolicy: 'no-cache'});
        const contacts = res.data.getContacts;
        yield put(setContacts(contacts))
        yield put(setContactsFetched());

    }catch(err){
        yield put(setContacts(null))
    }

}