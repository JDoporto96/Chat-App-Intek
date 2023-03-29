import { put} from "redux-saga/effects";
import { setInit } from "../reducers/message";
export function* resetMsg(action){
    try{
        yield put (setInit())
    }catch(err){
       
    }
}
