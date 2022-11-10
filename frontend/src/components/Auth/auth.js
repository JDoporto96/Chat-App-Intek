import { useLazyQuery } from "@apollo/client";
import { useState, createContext, useContext } from "react";
import ME from '../../graphql/queries/me'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [getMe, ] = useLazyQuery(ME)
    
    const login = async() =>{
        const {data} = await getMe();
        setUser(data.me)
    }

    const logout =() =>{
        setUser(null)
    }

    return (
    <AuthContext.Provider value={{user,login,logout}}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}