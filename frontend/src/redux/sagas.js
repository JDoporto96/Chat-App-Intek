import { put, call, takeEvery, all } from "redux-saga/effects";
import { client } from "../graphql/apollo-client";
import CREATE_NEW_USER from "../graphql/mutations/createUser";
import LOGIN from "../graphql/mutations/login";
import GET_CONTACTS from "../graphql/queries/getContacts";
import ME from "../graphql/queries/me";
import SEND_REQUEST from "../graphql/mutations/sendContactRequest"
import RESPOND_REQUEST from "../graphql/mutations/respondContactRequest"
import { setError,setInfo,setInit } from "./reducers/message";
import { setContacts, setContactsFetched } from "./reducers/getContacts";
import { setCurrentUser, setCurrentUserFetched } from "./reducers/getCurrentUser";
import { setLogged, setLogout } from "./reducers/login";
import GET_USER_CONV from "../graphql/queries/getUserConversations";
import { setConversations, setConvsFetched, setGroups } from "./reducers/conversations";
import GET_USER_GROUPS from "../graphql/queries/getGroups";
import CREATE_GROUP_CONV from "../graphql/mutations/createGroup";
import UPDATE_GROUP from "../graphql/mutations/updateGroup";
import REMOVE_CONTACT from "../graphql/mutations/removeContact";
import CREATE_CONV from "../graphql/mutations/createConversation";
import DELETE_GROUP_CONV from "../graphql/mutations/deleteGroup";
import {t} from 'i18next';
import DELETE_CONV from "../graphql/mutations/deleteConv";
import GET_REQUEST from "../graphql/queries/getRequests";
import { setRequests, setRequestsFetched } from "./reducers/requests";

function* register(action){
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

export function* watchRegister(){
    yield takeEvery("REGISTER",register)
}

function* logIn(action){
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

export function* watchLogin(){
    yield takeEvery("LOGIN",logIn)
}

function* sendRequest(action){
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
export function* watchSendRequest(){
    yield takeEvery("SEND_REQUEST",sendRequest)
}

function* removeContact(action){
    try{
        const contactId = action.payload.contactId;
        const res = yield call(client.mutate,{mutation: REMOVE_CONTACT,variables:{contactId}})
        const error = res.data.removeContact.error;
        if(error){
            yield put (setError(t(error)))
           
        }else{
            const message = res.data.removeContact.message;
            yield put (setInfo(t(message)))
            const res2 = yield call(client.query, {query:GET_CONTACTS, fetchPolicy: "no-cache"});
            const contacts = res2.data.getContacts;
         
            yield put(setContacts(contacts))
        }
    }catch(err){
        yield put (setError(t("Error on server")))
    }
}
export function* watchRemoveContact(){
    yield takeEvery("REMOVE_CONTACT",removeContact)
}

function* respondRequest(action){
    try{
        const input = action.payload.input;
        const res = yield call(client.mutate,{mutation: RESPOND_REQUEST,variables:{input}})
        const error = res.data.respondContactRequest.error;
     
        if(error){
            yield put (setError(t(error)))
           
        }else{
            const message = res.data.respondContactRequest.message;
            yield put (setInfo(t(message)))
            const res2 = yield call(client.query, {query:GET_CONTACTS, fetchPolicy: "no-cache"});
            const contacts = res2.data.getContacts;
         
            yield put(setContacts(contacts))
        }
    }catch(err){
        yield put (setError(t("Error on server")))
    }
}

export function* watchrespondRequest(){
    yield takeEvery("RESPOND_REQUEST",respondRequest)
}








function* userLogged(action){
    try{
        const token = action.payload.token
        yield put(setLogged({token}))
    }catch(err){
    }
}

export function* watchLogged(){
    yield takeEvery("LOGGED", userLogged)
}

function* updateError(action){
    try{
        const error =action.payload.error
        yield put (setError(error))
    }catch(err){
    }
}

export function* watchError(){
    yield takeEvery("ERROR_UPDATE",updateError)
}

function* updateInfo(action){
    try{
        const info =action.payload.message
        yield put (setInfo(info))
    }catch(err){
       
    }
}

export function* watchInfo(){
    yield takeEvery("INFO_UPDATE",updateInfo)
}

function* resetMsg(action){
    try{
        yield put (setInit())
    }catch(err){
       
    }
}

export function* watchResetMsg(){
    yield takeEvery("RESET_MSG",resetMsg)
}


function* userLogOut(action){
    try{
        yield put(setLogout())
        yield put(setContacts(null))
        yield put(setCurrentUser(null))
    }catch(err){
    }
}

export function* watchLogout(){
    yield takeEvery("LOGOUT", userLogOut)
}

function* createGroup(action){
    try{
        const input = action.payload.input;
        const res = yield call(client.mutate,{mutation: CREATE_GROUP_CONV,variables:{input}});
        const error = res.data.createGroup.error;
        if(error){
            yield put (setError(t(error)))
           
        }else{
            
            const message = res.data.createGroup.message;
            yield put (setInfo(t(message)))



        }
    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
    }
}
export function* watchCreateGroup(){
    yield takeEvery("CREATE_GROUP",createGroup)
}

function* createConversation(action){
    try{
        const receiverId = action.payload.receiverId;
        const res = yield call(client.mutate,{mutation: CREATE_CONV,variables:{receiverId}});
        const error = res.data.createConversation.error;
        if(error){
            yield put (setError(t(error)))
           
        }
    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
    }
}
export function* watchCreateConversation(){
    yield takeEvery("CREATE_CONVERSATION",createConversation)
}

function* deleteGroup(action){
    try{
        const conversationId = action.payload.conversationId;
      
        const res = yield call(client.mutate,{mutation: DELETE_GROUP_CONV,variables:{conversationId}});
        const error = res.data.deleteGroup.error;
        if(error){
            yield put (setError(t(error)))
           
        }
    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
    }
}
export function* watchDeleteGroup(){
    yield takeEvery("DELETE_GROUP",deleteGroup)
}

function* deleteConv(action){
    try{
        const {conversationId} = action.payload;
        const res = yield call(client.mutate,{mutation: DELETE_CONV,variables:{conversationId}});
        const error = res.data.deleteConversation.error;
        if(error){
            yield put (setError(t(error)))
           
        }
    }catch(err){
        yield put (setError(t("Error on server")))
    }
}
export function* watchDeleteConv(){
    yield takeEvery("DELETE_CONV",deleteConv)
}


function* updateGroup(action){
    try{
        const input = action.payload.input;
        const res = yield call(client.mutate,{mutation: UPDATE_GROUP,variables:{input}});
        const error = res.data.updateGroup.error;
        if(error){
            yield put (setError(t(error)))
           
        }else{
            
            const message = res.data.updateGroup.message;
            yield put (setInfo(t(message)))

           
            const res2 = yield call(client.query, {query:GET_USER_CONV, fetchPolicy: 'no-cache'});
            const convs = res2.data.getUserConversations;
            yield put(setConversations(convs))
    
            const res3 = yield call(client.query, {query:GET_USER_GROUPS, fetchPolicy: 'no-cache'});
            const groups = res3.data.getUserGroups;
            yield put(setGroups(groups))
    
            yield put(setConvsFetched());



        }
    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
    }
}
export function* watchUpdateGroup(){
    yield takeEvery("UPDATE_GROUP",updateGroup)
}


function* getCurrentUser(action){
    try{
        const res = yield call(client.query, {query:ME});
        const currentUser = res.data.me;
        yield put(setCurrentUser({currentUser}))
        yield put(setCurrentUserFetched())
    }catch(err){

        yield put(setCurrentUser(null))
    }

}

export function* watchGetCurrentUser(){
    yield takeEvery('GET_CURRENT_USER', getCurrentUser)
}

function* getContacts(action){
    try{
        const res = yield call(client.query, {query:GET_CONTACTS, fetchPolicy: 'no-cache'});
        const contacts = res.data.getContacts;
        yield put(setContacts(contacts))
        yield put(setContactsFetched());

    }catch(err){
        yield put(setContacts(null))
    }

}

export function* watchGetContacts(){
    yield takeEvery('GET_CONTACTS', getContacts)
}


function* getUserConversations(action){
    try{
        const res = yield call(client.query, {query:GET_USER_CONV, fetchPolicy: 'no-cache'});
        const convs = res.data.getUserConversations;
        yield put(setConversations(convs))

        const res2 = yield call(client.query, {query:GET_USER_GROUPS, fetchPolicy: 'no-cache'});
        const groups = res2.data.getUserGroups;
        yield put(setGroups(groups))

        yield put(setConvsFetched());

    }catch(err){
        yield put (setError(t("Error on server")))
        yield put(setGroups([]))
        yield put(setConversations([]))
    }

}

export function* watchGetUserConversations(){
    yield takeEvery('GET_USER_CONVS', getUserConversations)
}


function* getRequests(action){
    try{
        const res = yield call(client.query, {query:GET_REQUEST, fetchPolicy: 'no-cache'});
        const requests = res.data.getRequests;
        yield put(setRequests(requests))
        yield put(setRequestsFetched());

    }catch(err){
        yield put(setContacts(null))
    }

}

export function* watchGetRequests(){
    yield takeEvery('GET_REQUESTS', getRequests)
}



export default function* rootSaga() {
    yield all([
        watchGetCurrentUser(),
        watchGetContacts(),
        watchLogin(),
        watchLogout(),
        watchError(),
        watchRegister(),
        watchInfo(),
        watchResetMsg(),
        watchLogged(), 
        watchSendRequest(),
        watchrespondRequest(),
        watchGetUserConversations(),
        watchCreateGroup(),
        watchUpdateGroup(),
        watchCreateConversation(),
        watchDeleteGroup(),
        watchRemoveContact(),
        watchDeleteConv(),
        watchGetRequests(),
    ])
}

