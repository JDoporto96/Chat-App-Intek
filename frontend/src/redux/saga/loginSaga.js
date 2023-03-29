import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError, setInfo } from "../reducers/message";
import {t} from 'i18next';
import { setLogged } from "../reducers/login";
import LOGIN from "../../graphql/mutations/login";


export function* logIn(action){
    try{
        const input = action.payload.input;
        const res = yield call(client.mutate,{mutation:LOGIN,variables:{input}});
        const error = res.data.logIn.error;
        if(error){
           yield put (setError(t(error)))
           
        }else{
            const token = res.data.logIn.token
            localStorage.setItem('chat-app-user-jwt',token);
            const message='Successful login';
            yield put(setInfo(t(message)))
            yield put (setLogged({token}))
        }
        
    }catch(err){
        console.log(err)
        yield put (setError(t("Error on server")))
    }
}