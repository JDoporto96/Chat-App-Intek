import { put} from "redux-saga/effects";
import { setLogged } from "../reducers/login";

export function* userLogged(action){
    try{
        const token = action.payload.token
        yield put(setLogged({token}))
    }catch(err){
        console.log(err)
    }
}
