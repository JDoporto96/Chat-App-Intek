import { useLazyQuery } from "@apollo/client";
import { useState, createContext, useContext } from "react";
import GET_CONTACTS from "../../graphql/queries/getContacts";



const ContactsContext = createContext(null);

export const ContactsProvider = ({children}) =>{
    const [contacts,setContacts] = useState([]);
    const [getContacts,]= useLazyQuery(GET_CONTACTS)

    const fetchContacts = async() =>{
        const {data} = await getContacts()
        setContacts(data.getContacts)
       
    }

    const emptyContactsList =() =>{
        setContacts(null)
    }

    return (
    <ContactsContext.Provider value={{contacts,fetchContacts,emptyContactsList}}>
        {children}
    </ContactsContext.Provider>
    )
}

export const useContactsList = () =>{
    return useContext(ContactsContext)
}