import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    requests:[],
    fetched:false
};

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        setRequests:(state=null,action)=>{
            state.requests = action.payload; 
        },
        setRequestsFetched:(state = null,)=>{
            state.fetched = true;
        },
        setRequestInit:(state=null)=>{
            state.requests=[];
            state.fetched=false;
        }
    },
});

export const { setRequestInit, setRequests, setRequestsFetched } = requestsSlice.actions;

export default requestsSlice.reducer;