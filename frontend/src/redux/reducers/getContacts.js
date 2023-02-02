import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fetched: false,
    contactList: [],
};

const contactsSlice = createSlice({
    name: 'GET_CONTACTS',
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contactList = action.payload
        },
        setContactsFetched:(state = null,)=>{
            state.fetched = true;;
        },
        setContactsInit:(state=null)=>{
            state.contactList=[];
            state.fetched=false;
        }
    },
});

export const { setContacts,  setContactsFetched, setContactsInit} = contactsSlice.actions;

export default contactsSlice.reducer;