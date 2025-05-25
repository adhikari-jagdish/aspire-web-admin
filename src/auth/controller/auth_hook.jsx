import { createContext, useEffect, useState } from "react"
import auth_repository from "../repository/auth_repository"

export const AuthContext = createContext()
export const AuthCustomHook = ({child})=>{
    const [token, setToken] = useState("")
    const testObj = {
        token: token,
        setToken: setToken
    }

    useEffect(
        ()=>{
            auth_repository.getToken().then((token)=>{
                setToken(token)
            })
        },
        []
    )
    return (
        <AuthContext.Provider value={{token, setToken, testObj}}>
            {child}
        </AuthContext.Provider>
    )
}