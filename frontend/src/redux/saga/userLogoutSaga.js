import { put} from "redux-saga/effects";
import { setLogout } from "../reducers/login";
import { setContacts } from "../reducers/getContacts";
import { setCurrentUser } from "../reducers/getCurrentUser";


export function* userLogOut(action){
    try{
        yield put(setLogout())
        yield put(setContacts(null))
        yield put(setCurrentUser(null))
    }catch(err){
    }
}