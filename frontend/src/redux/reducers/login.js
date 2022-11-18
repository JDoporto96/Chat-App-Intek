import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged:false,
    loginError:null,
    token:null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state=null, action) => {
            state.token = action.payload.token;
            
        },
        setLogged:(state=null,action)=>{
            state.isLogged=true
        },
        
        setLoginError: (state=null,action) => {
            state.loginError = action.payload.error;
        },

        setLogout: (state=null, action)=>{
            state.isLogged = false
            state.token = null
        }
    },
});

export const { setToken, setLogged, setLoginError,setLogout } = authSlice.actions;

export default authSlice.reducer;