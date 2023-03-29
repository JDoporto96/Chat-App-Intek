import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setError, setInfo } from "../reducers/message";
import {t} from 'i18next';
import SEND_REQUEST from "../../graphql/mutations/sendContactRequest";

export function* sendRequest(action){
    try{
        const receiverUsername = action.payload.receiverUsername;;
        const res = yield call(client.mutate,{mutation: SEND_REQUEST,variables:{receiverUsername}})
        const error = res.data.sendContactRequest.error;
        if(error){
            yield put (setError(t(error)))
           
        }else{
            const message = res.data.sendContactRequest.message;
            yield put (setInfo(t(message)))
        }
    }catch(err){
        yield put (setError(t("Error on server")))
    }
}