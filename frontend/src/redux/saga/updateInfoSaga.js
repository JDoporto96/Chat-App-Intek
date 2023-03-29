import { put} from "redux-saga/effects";
import { setInfo } from "../reducers/message";


export function* updateInfo(action){
    try{
        const info =action.payload.message
        yield put (setInfo(info))
    }catch(err){
       
    }
}