import { createContext, useEffect, useState } from 'react';

import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '@storage/storageAuthToken';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

export type AuthContextDataProps = {
    user: UserDTO;
    updateUserProfile: (userUpdate: UserDTO) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
    children: React.ReactNode

}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)



    async function UserAndTokenUpdate(userData: UserDTO, token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        setUser(userData)

    }

    async function storageUserAndTokenSave(userData: UserDTO, token: string) {
        try {
            setIsLoadingUserStorageData(true)

            await storageUserSave(userData)
            await storageAuthTokenSave(token)
        }
        catch (error) {
            throw error

        }

        finally {
            setIsLoadingUserStorageData(false)

        }

    }



    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password })

            if (data.user && data.token) {
                await storageUserAndTokenSave(data.user, data.token)
                UserAndTokenUpdate(data.user, data.token)
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            setIsLoadingUserStorageData(false)

        }

    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true)

            const userLogged = await storageUserGet()
            const token = await storageAuthTokenGet()

            if (token && userLogged) {
                UserAndTokenUpdate(userLogged, token)
            }
        }

        catch (error) {
            console.log(error)
            throw error

        }
        finally {
            setIsLoadingUserStorageData(false)

        }

    }


    async function updateUserProfile(userUpdate: UserDTO) {
        try {
            setUser(userUpdate)
            await storageUserSave(userUpdate)
        }
        catch (error) {
            throw error
        }

    }



    async function signOut() {
        try {
            setIsLoadingUserStorageData(true)

            setUser({} as UserDTO)
            await storageUserRemove()
            await storageAuthTokenRemove()
        }
        catch (error) {
            throw error
        }
        finally {
            setIsLoadingUserStorageData(false)
        }
    }

    useEffect(() => {
        loadUserData()
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            isLoadingUserStorageData,
            signOut,
            updateUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}