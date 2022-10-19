import axios from "axios";
import { useState, createContext, useContext } from "react";
import { profilesAPIRoute } from "../../utils/APIRoutes";


const ContactsContext = createContext(null);

export const ContactsProvider = ({children}) =>{
    const [contacts,setContacts] = useState([]);

    const fetchContacts = async(userId) =>{
        const {data} = await axios.get(`${profilesAPIRoute}/${userId}/contacts`);
        const contactsList = data.map(contact=>{return{
          _id:contact._id,
          username:contact.username
        }})
        setContacts(contactsList);
       
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