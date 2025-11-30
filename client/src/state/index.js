import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  userId: null,
  token: null,
  user: null,
  loggedIn: false, // <-- thêm dòng này
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // FIX lỗi vỡ reducer
      state.userId =
        action.payload.user?.id || action.payload.user?._id || null;
      state.loggedIn = true; // <-- đánh dấu đã đăng nhập
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      state.loggedIn = false; // <-- đánh dấu đã logout
    },
  },
});

export const { setMode, setLogin, setLogout } = globalSlice.actions;

export default globalSlice.reducer;
