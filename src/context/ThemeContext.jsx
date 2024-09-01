"use client";
import {createContext, useState} from 'react';

const ThemeContext = createContext(undefined, undefined);

const ThemeContextProvider = ({ children }) => {

    const defaultTheme = 'light';

    const getThemeFromLocalStorage = () => {
        if (typeof window === 'undefined') {
            return defaultTheme;
        }
        const theme = localStorage.getItem('theme');
        return theme || defaultTheme;
    }

    const [theme, setTheme] = useState(getThemeFromLocalStorage);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;

export {ThemeContextProvider};

