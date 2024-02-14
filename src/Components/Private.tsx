import { useState, useEffect, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

// import firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Services'

interface PropsPrivate{
    children:ReactNode
}

export default function Private({children}:PropsPrivate){

    // state - isLogged
    const [isLogged, setIsLogged] = useState<boolean | null>(null)

    useEffect(() => {
        // Verificando se o usuario esta logado
        function verifyLoginUser(){
            onAuthStateChanged(auth, (user) => {
                if(user){
                    setIsLogged(true)
                } else{
                    setIsLogged(false)
                }
            })
        }

        verifyLoginUser()

    },[])

    if(isLogged === false){
        return <Navigate to='/' replace={true} />
    }else{
        return children
        
    }  
}