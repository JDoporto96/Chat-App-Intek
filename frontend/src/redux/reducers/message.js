import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error:null,
    info:null
};

const infoMessageSlice = createSlice({
    name: 'infoMessage',
    initialState,
    reducers: {
        setError:(state=null,action)=>{
            state.error = action.payload; 
        },
        setInfo:(state=null,action)=>{
            state.info = action.payload; 
        },
        setInit:(state=null)=>{
            state.error=null;
            state.info=null;
        }
    },
});

export const { setError,setInfo,setInit } = infoMessageSlice.actions;

export default infoMessageSlice.reducer;