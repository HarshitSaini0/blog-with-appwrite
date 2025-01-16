/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";




const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});


export default store;