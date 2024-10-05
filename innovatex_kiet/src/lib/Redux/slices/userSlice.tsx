// context/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  auth: boolean;
  email: string | null;
}

const initialState: UserState = {
  auth: false,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.auth = true;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.auth = false;
      state.email = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
