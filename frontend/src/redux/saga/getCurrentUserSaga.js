import { put, call} from "redux-saga/effects";
import { client } from "../../graphql/apollo-client";
import { setCurrentUser, setCurrentUserFetched } from "../reducers/getCurrentUser";
import ME from "../../graphql/queries/me";

export function* getCurrentUser(action){
    try{
        const res = yield call(client.query, {query:ME});
        const currentUser = res.data.me;
        yield put(setCurrentUser({currentUser}))
        yield put(setCurrentUserFetched())
    }catch(err){

        yield put(setCurrentUser(null))
    }

}