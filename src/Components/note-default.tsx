import * as Dialog from '@radix-ui/react-dialog'

export function NoteDefaultNew(){

    function exibirModa(){

    }

    return(
        <Dialog.Root>

            {/* Trocando o button pelo dialog tringger */}
            <Dialog.Trigger className="text-justify flex flex-col bg-slate-700 gap-3 p-5 rounded-md  hover:ring-2 hover: ring-slate-600 transition" onClick={exibirModa}>
            
                <h1 className="text-slate-200 ">Adicionar nota</h1>

                <p className=" text-slate-400">
                    Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
                
            </Dialog.Trigger>

            {/* Exibindo resultado fora do body */}
                <Dialog.Portal>

                    {/* efeito de box shadow na tela ao abrir o modal */}
                    <Dialog.Overlay className='inset-0 fixed shadow-2xl bg-black/70 transition'/>

                    {/* Onde estara o modal/conteudo a ser exibido */}
                    <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <div className=' flex flex-col h-[60vh] gap-3 p-5 bg-slate-700 rounded-t-md'>
                            <h1 className='text-slate-200'>Adicionar nota</h1>
                            
                            <p className='text-slate-400'>Comece <strong className='text-lime-400'>gravando</strong> uma nota em áudio ou se preferir <strong className='text-lime-400'>utilize apenas texto.</strong></p>
                        </div>

                        <button className='bg-lime-400 w-full rounded-b-md p-2'>Adicionar nota</button>
                    </Dialog.Content>

                </Dialog.Portal>
            
        </Dialog.Root>
    )
}