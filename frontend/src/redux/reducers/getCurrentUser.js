import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    fetched: false,
};

const userSlice = createSlice({
    name: 'GET_CURRENT_USER',
    initialState,
    reducers: {
        setCurrentUser: (state=null, action) => {
            state.user = action.payload.currentUser;
        },
        setCurrentUserFetched:(state = null)=>{
            state.fetched = true;;
        }
    },
});

export const { setCurrentUser, setCurrentUserFetched } = userSlice.actions;

export default userSlice.reducer;