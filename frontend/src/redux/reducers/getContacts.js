import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contacts: [],
};

const contactsSlice = createSlice({
    name: 'GET_CONTACTS',
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload
        },
    },
});

export const { setContacts} = contactsSlice.actions;

export default contactsSlice.reducer;