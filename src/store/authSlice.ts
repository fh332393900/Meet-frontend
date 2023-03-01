import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  authState: boolean;
  token: string;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  token: '',
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setTokenState(state, action) {
      state.token = action.payload;
    }
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState, setTokenState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectTokenState = (state: AppState) => state.auth.token;

export default authSlice.reducer;