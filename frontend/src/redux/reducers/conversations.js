import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    groups:[],
    conversations:[],
    fetched:false
};

const convsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        setGroups:(state=null,action)=>{
            state.groups = action.payload; 
        },
        setConversations:(state=null,action)=>{
            state.conversations = action.payload; 
        },
        setConvsFetched:(state = null,)=>{
            state.fetched = true;
        },
        setConvsInit:(state=null)=>{
            state.groups=[];
            state.conversations=[];
            state.fetched=false;
        }
    },
});

export const { setConvsFetched, setConvsInit, setGroups, setConversations } = convsSlice.actions;

export default convsSlice.reducer;