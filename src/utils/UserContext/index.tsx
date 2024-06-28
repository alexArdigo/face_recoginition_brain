import React, {useState} from "react";

export interface UserContextData {
    id: number | null
    getUserId: (userId: number | null) => void;
    email: string | null
    setEmail: React.Dispatch<React.SetStateAction<string | null>>
}



export const UserContext = React.createContext<UserContextData>({
    id: null,
    getUserId: () => {},
    email: null,
    setEmail:   () => {},
})

export interface UserProviderData {
    children: React.ReactNode;
}



export const UserProvider: React.FC<UserProviderData> = ({children}) => {
    const [id, setId] = useState<UserContextData['id'] | null>(null);
    const [email, setEmail] = useState<UserContextData['email'] | null>(null);

    const getUserId: UserContextData['getUserId'] = (userId: UserContextData['id']) => {
        setId(userId)
    }

    return (
        <UserContext.Provider value={{id, getUserId, email, setEmail}}>
            {children}
        </UserContext.Provider>
    )
}