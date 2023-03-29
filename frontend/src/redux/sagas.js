import {takeEvery, all } from "redux-saga/effects";
//--------------------------------------------
import { register } from "./saga/registerSaga";
import { logIn } from "./saga/loginSaga";
import { sendRequest } from "./saga/sendRequestSaga";
import { removeContact } from "./saga/removeContactSaga";
import { respondRequest } from "./saga/respondRequestSaga";
import { userLogged } from "./saga/userLoggedSaga";
import { updateError } from "./saga/updateErrorSaga";
import { updateInfo } from "./saga/updateInfoSaga";
import { resetMsg } from "./saga/resetMsgSaga";
import { userLogOut } from "./saga/userLogoutSaga";
import { createGroup } from "./saga/createGroupSaga";
import { createConversation } from "./saga/createConversationSaga";
import { deleteGroup } from "./saga/deleteGroupSaga";
import { deleteConv } from "./saga/deleteConvSaga";
import { updateGroup } from "./saga/updateGroupSaga";
import { getCurrentUser } from "./saga/getCurrentUserSaga";
import { getContacts } from "./saga/getContactsSaga";
import { getUserConversations } from "./saga/getUserConversationsSaga";
import { getRequests } from "./saga/getRequestsSaga";
import { loginBundleSaga } from "./saga/loginBundleSaga";

export function* watchRegister(){
    yield takeEvery("REGISTER",register)
}


export function* watchLogin(){
    yield takeEvery("LOGIN",logIn)
}


export function* watchSendRequest(){
    yield takeEvery("SEND_REQUEST",sendRequest)
}

export function* watchRemoveContact(){
    yield takeEvery("REMOVE_CONTACT",removeContact)
}

export function* watchrespondRequest(){
    yield takeEvery("RESPOND_REQUEST",respondRequest)
}

export function* watchLogged(){
    yield takeEvery("LOGGED", userLogged)
}


export function* watchError(){
    yield takeEvery("ERROR_UPDATE",updateError)
}


export function* watchInfo(){
    yield takeEvery("INFO_UPDATE",updateInfo)
}


export function* watchResetMsg(){
    yield takeEvery("RESET_MSG",resetMsg)
}


export function* watchLogout(){
    yield takeEvery("LOGOUT", userLogOut)
}


export function* watchCreateGroup(){
    yield takeEvery("CREATE_GROUP",createGroup)
}


export function* watchCreateConversation(){
    yield takeEvery("CREATE_CONVERSATION",createConversation)
}


export function* watchDeleteGroup(){
    yield takeEvery("DELETE_GROUP",deleteGroup)
}


export function* watchDeleteConv(){
    yield takeEvery("DELETE_CONV",deleteConv)
}



export function* watchUpdateGroup(){
    yield takeEvery("UPDATE_GROUP",updateGroup)
}




export function* watchGetCurrentUser(){
    yield takeEvery('GET_CURRENT_USER', getCurrentUser)
}


export function* watchGetContacts(){
    yield takeEvery('GET_CONTACTS', getContacts)
}




export function* watchGetUserConversations(){
    yield takeEvery('GET_USER_CONVS', getUserConversations)
}



export function* watchGetRequests(){
    yield takeEvery('GET_REQUESTS', getRequests)
}

export function* watchLoginBundle(){
    yield takeEvery('USER_LOGIN', loginBundleSaga)
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
        watchLoginBundle()
    ])
}

