// imports react
import { ChangeEvent, useState } from 'react'

// import radix
import * as Dialog from '@radix-ui/react-dialog'

// import Context
import { useNotes } from '../Context'

// imports firebase
import { db } from '../Services'
import { setDoc, doc } from 'firebase/firestore'


export function NoteDefaultNew(){

    // states - globais
    const { notes, setNotes, id } = useNotes()
    
    // Referencia ao textArea
    const [createNote, setCreateNote] = useState<string>('')

    // state - option
    const [board, setBoard] = useState<boolean>(false)

    // writeOption
    function onBoard(){
        setBoard(true)
    }

    // contentWords
    function contentWordsAndUpdateState(e:ChangeEvent<HTMLTextAreaElement>){

        // Voltando o paragrafo caso o valor do input seja vazio
        if(e.target.value === ''){
            setBoard(false)
        }

        // Atualizando o valor da state
        setCreateNote(e.target.value)
    }

    // addNote
    async function addNote(){
        try {
            if(createNote !== ''){
                // Salvando na state notes
                setNotes([...notes,{
                    date:new Date(),
                    text:createNote
                }])

                await setDoc(doc(db,'Users',id as string),{
                    Notes:[...notes,{
                        date:Date.now(),
                        text:createNote
                    }]
                })

                // Limpando state
                setCreateNote('')
            }
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <Dialog.Root>

            

            {/* Trocando o button pelo dialog tringger */}
            <Dialog.Trigger className="text-justify flex flex-col bg-slate-700 gap-3 p-5 rounded-md  hover:ring-2 hover: ring-slate-600 transition h-80" onClick={() => setBoard(false)}>

                <h1 className="text-slate-200 ">Adicionar nota</h1>

                <p className=" text-slate-400">
                    Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
                
            </Dialog.Trigger>

            {/* Exibindo resultado fora do body */}
                <Dialog.Portal>

                    {/* efeito de box shadow na tela ao abrir o modal */}
                    <Dialog.Overlay  className='inset-0 fixed shadow-2xl bg-black/70 transition'/>

                    {/* Onde estara o modal/conteudo a ser exibido */}
                    <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'>  
                        {/* Icon de fechar modal */}
                        <Dialog.Close className=' py-1.5 px-3 absolute right-0 top-0 bg-slate-800 text-white'>x</Dialog.Close>

                        <div className=' flex flex-col w-[80vh] h-[60vh] gap-3 p-5 bg-slate-700 rounded-t-md'> 

                            <h1 className='text-slate-200'>Adicionar nota</h1>
                            
                            {board ? 
                            <textarea onChange={contentWordsAndUpdateState} className='bg-black/10 text-white outline-none resize-none p-1' rows={10} name="myNotes" id="note" autoFocus/>
                             : 
                             <p className='text-slate-400'>Comece <button onClick={onBoard}className='text-lime-400'>gravando </button> uma nota em áudio ou se preferir <button className='text-lime-400' onClick={onBoard}>utilize apenas texto.</button>
                            </p>}
                        </div>

                        <Dialog.Close className='bg-lime-400 w-full rounded-b-md p-2' onClick={addNote}>Adicionar nota</Dialog.Close>
                    </Dialog.Content>

                </Dialog.Portal>
            
        </Dialog.Root>
    )
}