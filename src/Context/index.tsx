import { ReactNode, createContext, useContext, useState } from 'react'

interface PropsContext{
    notes: any[],
    setNotes:React.Dispatch<React.SetStateAction<any[]>>,
    id:string,
    setId:React.Dispatch<React.SetStateAction<string>>
}

interface PropsChild{
    children:ReactNode
}

const Context = createContext<PropsContext | undefined>(undefined)

// Provider
export function NotesProvider({children}:PropsChild){
    // notes - state
    const [notes, setNotes] = useState<any[]>([])

    // id - state
    const [id, setId] = useState<string>('')

    return(
        <Context.Provider value={{notes, setNotes, id, setId}}>
            {children}
        </Context.Provider>
    )
}

// useNotes
export function useNotes():PropsContext{
    // busco o context
    const ContextNotes = useContext(Context)

    if(!ContextNotes){
        throw 'error'
    }

    return ContextNotes
}