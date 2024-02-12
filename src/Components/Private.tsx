import { useState, useEffect, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface PropsPrivate{
    children:ReactNode
}

export default function Private({children}:PropsPrivate){

    // state - isLogged
    const [isLogged, setIsLogged] = useState<boolean | null>(null)

    useEffect(() => {
        // Verificando se tem algo na localStorage
        if(localStorage.getItem('@user') !== null ){
            setIsLogged(true)
        }

        setIsLogged(false)

    },[])

    if(isLogged){
        return children
    }

    return Navigate({to:'/',replace:true})
}