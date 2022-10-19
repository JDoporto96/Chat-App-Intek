import React from 'react'
import { useAuth } from './auth'
import {Navigate} from 'react-router-dom'

export const RequireAuth = ({children}) => {
    const auth = useAuth()
    
    if(!auth.user){
      console.log("no user")
        return <Navigate to= '/login'/>
    }
  return children
}
