import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: 'GET_CURRENT_USER',
    initialState,
    reducers: {
        setCurrentUser: (state=null, action) => {
            state.currentUser = action.payload.currentUser;
        },
    },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;