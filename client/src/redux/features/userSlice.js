const { createSlice } = require("@reduxjs/toolkit")

const getInitialUserState = () => {
    if (typeof window !== 'undefined') {
      // Access localStorage only in the browser
      return JSON.parse(localStorage.getItem("user")) || null;
    } else {
      return null; // On the server, set initial user state to null
    }
  };

const initialState = {
    currentUser: getInitialUserState(),
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(state.currentUser));
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
            localStorage.removeItem("user");
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;