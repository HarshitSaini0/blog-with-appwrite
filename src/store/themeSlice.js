import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: Cookies.get('theme') || 'light', // Read from cookie first
    },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            // Save to cookie on toggle
            Cookies.set('theme', state.theme, { expires: 7 }); // Expires in 7 days
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
            // Save to cookie when explicitly set
            Cookies.set('theme', action.payload, { expires: 7 });
        }
    }
});

export default themeSlice.reducer;
export const { toggleTheme, setTheme } = themeSlice.actions;