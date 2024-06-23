import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: {
        token: string | null;
        authenticated: boolean | null;
    };
    onRegister?: (email:string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    storePet?: (formData: FormData) => Promise<any>;
    onLogout?: () => Promise<any>;
    petsUser?: () => Promise<any>;
}

const TOKEN_KEY      = 'token-key';
export const API_URL = 'http://192.168.100.86:3000';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ( {children}: any ) => {
    const [ authState, setAuthState ] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect( () => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            
            if( token ) {

                setAuthState({
                    token        : token,
                    authenticated: true
                });
            } 
        };
        loadToken();
    }, [])

    const register = async ( email: string, password: string ) => {
        try {
            return await fetch(`${API_URL}/auth/sign-up`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
        } catch ( e ) {
            return { error: true, msg: (e as any).response };
        }
    };

    const login = async ( email: string, password: string) => {
        try {
            const result = await fetch(`${API_URL}/auth/sign-in`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const resultData = await result.json();
            console.log(resultData)
            setAuthState({
                token: resultData.token,
                authenticated: true
            })

            await SecureStore.setItemAsync(TOKEN_KEY, resultData.token);

            return resultData;
        }catch ( e ) {
            console.log(e)
            return { error: true, msg: (e as any ).response }
        }
    }

    const logout = async () => {
        // DELETE TOKEN FROM STORGE
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        setAuthState({
            token: null,
            authenticated: false
        })
    }

    const storePet = async (formData: FormData) => {
        try {
            const result = await fetch(`${API_URL}/pet`, {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${authState.token}`
                },
                body: formData
            });

            const resultData = await result.json();

            console.log(resultData)
            return resultData;
        }catch ( e ) {
            console.log(e)
            return { error: true, msg: (e as any ).response }
        }
    }

    const petsUser = async () => {
        const result = await fetch(`${API_URL}/pet/user-auth`, {
            headers: {
                "Authorization": `Bearer ${authState.token}`
            }
        });

        const resultData = await result.json();

        return resultData;
    }

    const value = {
        onRegister: register,
        onLogin   : login,
        onLogout  : logout,
        storePet ,
        authState,
        petsUser

    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}