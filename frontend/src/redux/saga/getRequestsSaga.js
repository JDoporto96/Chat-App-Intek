import { put, call} from "redux-saga/effects";
import GET_REQUEST from "../../graphql/queries/getRequests";
import { client } from "../../graphql/apollo-client";
import { setContacts } from "../reducers/getContacts";
import { setRequests, setRequestsFetched } from "../reducers/requests";


export function* getRequests(action){
    try{
        const res = yield call(client.query, {query:GET_REQUEST, fetchPolicy: 'no-cache'});
        const requests = res.data.getRequests;
        yield put(setRequests(requests))
        yield put(setRequestsFetched());

    }catch(err){
        yield put(setContacts(null))
    }

}
