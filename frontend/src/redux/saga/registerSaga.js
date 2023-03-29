import { put, call} from "redux-saga/effects";
import CREATE_NEW_USER from "../../graphql/mutations/createUser";
import { client } from "../../graphql/apollo-client";
import { setError, setInfo } from "../reducers/message";
import {t} from 'i18next';

export function* register(action){
    try{
        const input = action.payload.input;
        const res = yield call(client.mutate,{mutation:CREATE_NEW_USER,variables:{input}});
        const error = res.data.createUser.error;
        if(error){
           
            yield put (setError(t(error)))
         
            
           
        }else{
            const message = res.data.createUser.message;
            yield put (setInfo(t(message)))
        }
       
        
    }catch(err){
        yield put (setError(t("Error on server")))
    }
}