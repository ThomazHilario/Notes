import { ChangeEvent, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export function NoteDefaultNew(){

    // state - option
    const [option, setOption] = useState<boolean>(false)

    // writeOption
    function writeOption(){
        setOption(true)
    }

    // contentWords
    function contentWords(e:ChangeEvent<HTMLTextAreaElement>){
        if(e.target.value == ''){
            setOption(false)
        }
    }
    return(
        <Dialog.Root>

            

            {/* Trocando o button pelo dialog tringger */}
            <Dialog.Trigger className="text-justify flex flex-col bg-slate-700 gap-3 p-5 rounded-md  hover:ring-2 hover: ring-slate-600 transition" onClick={() => setOption(false)}>

                <h1 className="text-slate-200 ">Adicionar nota</h1>

                <p className=" text-slate-400">
                    Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
                
            </Dialog.Trigger>

            {/* Exibindo resultado fora do body */}
                <Dialog.Portal>

                    {/* efeito de box shadow na tela ao abrir o modal */}
                    <Dialog.Overlay  className='inset-0 fixed shadow-2xl bg-black/70 transition'onClick={() => console.log('oi')}/>

                    {/* Onde estara o modal/conteudo a ser exibido */}
                    <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>  
                        {/* Icon de fechar modal */}
                        <Dialog.Close className=' py-1.5 px-3 absolute right-0 top-0 bg-slate-800 text-white'>x</Dialog.Close>
                        <div className=' flex flex-col w-[80vh] h-[60vh] gap-3 p-5 bg-slate-700 rounded-t-md'> 

                            <h1 className='text-slate-200'>Adicionar nota</h1>
                            
                            {option ? 
                            <textarea onChange={contentWords} className='bg-black/10 text-white outline-none resize-none p-1' rows={10} name="myNotes" id="note" autoFocus/>
                             : 
                             <p className='text-slate-400'>Comece <button onClick={writeOption}className='text-lime-400'>gravando </button> uma nota em áudio ou se preferir <button className='text-lime-400' onClick={writeOption}>utilize apenas texto.</button>
                            </p>}
                        </div>

                        <button className='bg-lime-400 w-full rounded-b-md p-2'>Adicionar nota</button>
                    </Dialog.Content>

                </Dialog.Portal>
            
        </Dialog.Root>
    )
}