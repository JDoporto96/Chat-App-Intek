import { getContacts } from "./getContactsSaga";
import { getCurrentUser } from "./getCurrentUserSaga";
import { getUserConversations } from "./getUserConversationsSaga";


export function* loginBundleSaga(){
    try{
        yield getContacts();
        yield getCurrentUser();
        yield getUserConversations();

        
    }catch(err){
        console.log(err)
    }

}