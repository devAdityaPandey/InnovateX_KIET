// src/context/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  auth: boolean;
  email: string | null;
  username: string | null; // New field added
}

const initialState: UserState = {
  auth: false,
  email: null,
  username: null, // Initialize username as null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ email: string; }>) => {
      state.auth = true;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.auth = false;
      state.email = null;
      state.username = null; // Clear the username on logout
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    }
  },
});

export const { loginUser, logoutUser, setUsername } = userSlice.actions;

export default userSlice.reducer;
