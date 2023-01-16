import { put, call, takeEvery, all } from "redux-saga/effects";
import { client } from "../graphql/apollo-client";
import LOGIN from "../graphql/mutations/login";
import GET_CONTACTS from "../graphql/queries/getContacts";
import ME from "../graphql/queries/me";
import { setContacts } from "./reducers/getContacts";
import { setCurrentUser } from "./reducers/getCurrentUser";
import { setToken, setLoginError, setLogged, setLogout } from "./reducers/login";

function* logIn(action){
    try{
        const input = action.payload.input;
        const res = yield call(client.mutate,{mutation:LOGIN,variables:{input}});
        const error = res.data.logIn.error;
        if(error){
           yield put (setLoginError({error}))
        }else{
            yield put (setLoginError(false))
            const token = res.data.logIn.token
            yield put (setToken({token}))
        }
    }catch(err){
        yield put (setLoginError("Error on server"))
    }


}

export function* watchLogin(){
    yield takeEvery("LOGIN",logIn)
}

function* userLogged(action){
    try{
        yield put(setLogged())
    }catch(err){
        console.log(err)
    }
}

export function* wachtLogged(){
    yield takeEvery("LOGGED", userLogged)
}

function* userLogOut(action){
    try{
        yield put(setLogout())
        yield put(setContacts(null))
        yield put(setCurrentUser(null))
    }catch(err){
        console.log(err)
    }
}

export function* watchLogout(){
    yield takeEvery("LOGOUT", userLogOut)
}




function* getCurrentUser(action){
    try{
        const res = yield call(client.query, {query:ME});

        const currentUser = res.data.me;

        yield put(setCurrentUser({currentUser}))
    }catch(err){

        yield put(setCurrentUser(null))
    }

}

export function* watchGetCurrentUser(){
    yield takeEvery('GET_CURRENT_USER', getCurrentUser)
}

function* getContacts(action){
    try{
        const res = yield call(client.query, {query:GET_CONTACTS});
        const contacts = res.data.getContacts;

        yield put(setContacts(contacts))

    }catch(err){
        yield put(setContacts(null))
    }

}

export function* watchGetContacts(){
    yield takeEvery('GET_CONTACTS', getContacts)
}


export default function* rootSaga() {
    yield all([
        watchGetCurrentUser(),
        watchGetContacts(),
        watchLogin(),
        wachtLogged(),
        watchLogout(),
    ])
}

