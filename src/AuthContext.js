import { createContext } from "react";
import { useLocalStorage } from "./useLocalStorage";


export const AuthContext = createContext({})

/* export const AuthContextProvider = ({ children }) => {
    return(

    <AuthContext.Provider value = {useLocalStorage("user", null)}>
        {children}
    </AuthContext.Provider>
    )
} */