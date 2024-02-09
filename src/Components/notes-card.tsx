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

// PropsCard
interface PropsCard{
    date:number,
    text:string,
    position:number;
}

export function NotesCard({ date, text, position}:PropsCard){

    // state - notes e setNotes
    const { notes, setNotes, id} = useNotes()

    // deleteNotes
    async function deleteNotes(position:number){
       try {
            // Notificando a delecao da nota
            toast.success('Nota deletada')

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
            <Dialog.Trigger className=" text-justify flex flex-col bg-gradient-to-t p-5 gap-3 from-black/30 to-slate-700/60 rounded-md hover:ring-2 hover: ring-slate-600 transition h-80 card">

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
                    <Dialog.Close className=' py-1.5 px-3 absolute right-0 top-0 bg-slate-800 text-white'>x</Dialog.Close>

                    <div className=' h-[90vh] w-[100vw] sm:h-[60vh] sm:w-[70vw] md:flex flex-col gap-3 p-5 bg-slate-700 rounded-t-md lg:w-[60vw]'>
                        <h1 className='text-slate-200'>{formatDistanceToNow(date,{addSuffix:true,locale:ptBR})}</h1>
                        
                        <p className='text-slate-400'>{text}</p>
                    </div>

                    <button className='bg-red-500 w-full rounded-b-md p-2' onClick={() => deleteNotes(position)}>Deseja apagar esta nota ?</button>
                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>

    )
}