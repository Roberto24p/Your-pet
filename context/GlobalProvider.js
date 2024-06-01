import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ( { children } ) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser]             = useState(null);
    const [isLoading, setIsLoadding]  = useState(true);

    useEffect( () => {
        console.log('ENTRE AL USE EFFECT DEL GLOBALPROBIDER')
        getCurrentUser()
            .then( resp => {
                if( resp ) {
                    setIsLoggedIn(true);
                    setUser(resp);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch( (error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoadding(false);
            })
    }, [])
    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}