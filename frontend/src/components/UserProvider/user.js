import { useState, createContext, useContext } from "react";
import ME from '../../graphql/queries/me'
import { useLazyQuery } from "@apollo/client";

const UserContext = createContext(null);

export const UserProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(null);
    const [getMe, ] = useLazyQuery(ME)

    const userLogin =async() =>{
        const {data} = await getMe();
        setCurrentUser(data.me)
    }

    const userLogout =() =>{
        setCurrentUser(null)
    }

    return (
    <UserContext.Provider value={{currentUser,userLogin,userLogout}}>
        {children}
    </UserContext.Provider>
    )
}

export const useCurrentUser = () =>{
    return useContext(UserContext)
}