import { put} from "redux-saga/effects";
import { setError } from "../reducers/message";

export function* updateError(action){
    try{
        const error =action.payload.error
        yield put (setError(error))
    }catch(err){
        console.log(err);
    }
}