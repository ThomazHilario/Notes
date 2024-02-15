import * as Dialog from '@radix-ui/react-dialog'

// imports Context
import { useNotes } from '../Context';

// imports date-fns
import { formatDistanceToNow} from 'date-fns'
import { ptBR } from 'date-fns/locale'

// imports firebase
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../Services';

// Import toast
import { toast } from 'sonner'

// lucide icons
import { FilePenLine, X  } from 'lucide-react'
import { useState } from 'react';

// PropsCard
interface PropsCard{
    date:number,
    text:string,
    position:number;
}

export function NotesCard({ date, text, position}:PropsCard){

    // state - notes e setNotes
    const { notes, setNotes, id} = useNotes()

    // state - wordNote
    const [wordNote, setWordNote] = useState<string>(text)

    // state - isToEditNote
    const [isToEditNote, setIsToEditNote] = useState<boolean>(false)

    // IsToEditNote
    function IsToEditNote(){
        if(isToEditNote === false){
            setIsToEditNote(true)
        } else{
            setIsToEditNote(false)
        }
    }

    // editNote
    async function editNote(){
        try {
            if(wordNote !== ''){
                // Atualizando a nota 
                // passando o date atual e a nova nota
                notes[position].date = date
                notes[position].text = wordNote
                
                // Salvando nova state
                setNotes([...notes])
                
                // Referencia do banco de dados
                const docRef = doc(db,'Users',id)

                // Atulizando no banco de dados
                await updateDoc(docRef,{
                    Notes: [...notes]
                })

                // Notificação de sucesso
                toast.success('Nota editada',{style:{color:'white',border:'0' ,background:'#F46767'}})
            }
        } catch (error) {
            console.log(error)
        } finally{
            setIsToEditNote(false)
        }
    }

    // deleteNotes
    async function deleteNotes(position:number){
       try {
            // Notificando a delecao da nota
            toast.success('Nota deletada',{style:{color:'white',border:'0' ,background:'#F46767'}})

            // Deletando nota
            notes.splice(position, 1)

            // Atulizando state
            setNotes([...notes])
    
            // referencia do documento
            const docRef = doc(db,'Users', id)

            // Atualizando o banco de dados
            await updateDoc(docRef,{
                Notes:[...notes]
            })
       } catch (e) {
        console.log(e)
       }
        
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className=" text-justify flex flex-col bg-gradient-to-t p-5 gap-3 from-black/30 to-slate-700/60 rounded-md hover:ring-2 hover: ring-slate-600 transition h-80 duration-300 card">

                {/* Data de criacao da nota */}
                <h1 className="text-slate-200">{formatDistanceToNow(date,{addSuffix:true,locale:ptBR})}</h1>

                {/* Texto da nota */}
                <p className="text-slate-400">{text}</p>
            </Dialog.Trigger>

            {/* Exibir resultado */}
            <Dialog.Portal>

                {/* efeito de box shadow na tela ao abrir o modal */}
                <Dialog.Overlay className='inset-0 fixed shadow-2xl bg-black/70 transition'/>
                
                {/* Conteudo modal */}
                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    
                    {/* Icon de fechar modal */}
                    <Dialog.Close className=' py-1.5 px-3 absolute right-0 top-0 bg-slate-800 text-white' onClick={() => setIsToEditNote(false)}><X size={20}/></Dialog.Close>

                    <button className=' py-1.5 px-3 absolute left-0 top-0 bg-slate-800 text-white' onClick={IsToEditNote}><FilePenLine size={20} /></button>

                    {isToEditNote 
                        ? 
                        <div className=' pt-10 h-[95vh] w-[100vw] sm:h-[60vh] sm:w-[70vw] md:flex flex-col gap-3 p-5 bg-slate-700 rounded-t-md lg:w-[60vw]'>
                            <textarea className='w-[100%] bg-black/10 text-white outline-none resize-none p-1' rows={10} name="myNotes" id="note" autoFocus value={wordNote} onChange ={(e) => setWordNote(e.target.value)}/>
                        </div>

                        :

                        <div className=' pt-10 h-[95vh] w-[100vw] sm:h-[60vh] sm:w-[70vw] md:flex flex-col gap-3 p-5 bg-slate-700 rounded-t-md lg:w-[60vw]'>
                            <h1 className='text-slate-200'>{formatDistanceToNow(date,{addSuffix:true,locale:ptBR})}</h1>
                            
                            <p className='text-slate-400'>{text}</p>
                        </div>
                    }

                    {isToEditNote 
                        ?
                        <Dialog.Close className='group bg-lime-400 w-full rounded-b-md p-2' onClick={editNote}><span className='px-3 pb-[2px] group-hover:border-b-[1px] border-black'>Editar nota</span></Dialog.Close>

                        :
                        
                        <button className='group bg-red-500 w-full rounded-b-md p-2  ' onClick={() => deleteNotes(position)}><span className='group-hover:border-b-[1px] border-white'>Deseja apagar esta nota ?</span></button>
                    }
                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>

    )
}