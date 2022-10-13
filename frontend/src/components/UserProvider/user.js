import { useState, createContext, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(null);

    const userLogin =(user) =>{
        setCurrentUser(user)
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