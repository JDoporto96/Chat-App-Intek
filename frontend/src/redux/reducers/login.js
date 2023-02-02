import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged:false,
    token:null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogged:(state=null,action)=>{
            state.token = action.payload.token;
            state.isLogged=true
        },
        
        setLogout: (state=null, action)=>{
            state.isLogged = false
            state.token = null
        }
    },
});

export const { setLogged,setLogout } = authSlice.actions;

export default authSlice.reducer;