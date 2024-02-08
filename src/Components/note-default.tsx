// imports react
import { ChangeEvent, useState } from 'react'

// import radix
import * as Dialog from '@radix-ui/react-dialog'

// import Context
import { useNotes } from '../Context'

// imports firebase
import { db } from '../Services'
import { setDoc, doc } from 'firebase/firestore'


let Speech:SpeechRecognition | null = null

export function NoteDefaultNew(){

    // states - globais
    const { notes, setNotes, id } = useNotes()
    
    // Referencia ao textArea
    const [createNote, setCreateNote] = useState<string>('')

    // state - board
    const [board, setBoard] = useState<boolean>(false)

    // state - isRecord
    const [isRecord, setIsRecord] = useState<boolean>(false)

    // openBoardCard
    function openBoardCard(){

        // Tirando o text area
        setBoard(false)

        // Tirando o button do gravador
        setIsRecord(false)
    }

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
                setNotes([{
                    date:new Date(),
                    text:createNote
                },...notes])

                await setDoc(doc(db,'Users',id as string),{
                    Notes:[{
                        date:Date.now(),
                        text:createNote
                    },...notes]
                })

                // Limpando state
                setCreateNote('')
            }
        } catch (error) {
            console.log(error)
        }

    }

    // startVoice
    function startVoice(){

        // Verificando se o objeto window tem suporte com api de voz
        const isRecordingInBrowser = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

        // Retornando a janela antiga caso nao tenha suporte de voz
        if(!isRecordingInBrowser){
            alert('Seu navegador nao suporta gravacao de voz')
            setIsRecord(false)
            setBoard(false)
            return
        }

        // exibindo o novo button
        setIsRecord(true)

        // Exibindo text area
        setBoard(true)

        // Buscando o speech referente ao navegador
        const isRecordSpeech = window.SpeechRecognition || window.webkitSpeechRecognition

        // Instanciando isRecordSpeech
        Speech = new isRecordSpeech()

        // linguagem de fala
        Speech.lang = 'pt-BR'

        // Maximo de alternativas de palavra dificeis
        Speech.maxAlternatives = 1

        // Falando para a api que no quero que ela pare de gravar ao parar de falar
        Speech.continuous = true

        // Mostrando resultado instantaneamente
        Speech.interimResults = true

        // function que ativa o speech ao falar
        Speech.onresult = ((event) => {
            const frase = Array.from(event.results).reduce((text,result) => {return text.concat(result[0].transcript)},'')

            setCreateNote(frase) 
        })
        Speech.start()

    }
    
    // stopVoice
    function stopVoice(){

        setIsRecord(false)

        if(Speech !== null){
            Speech.stop()
        }
    }
    return(
        <Dialog.Root>

            

            {/* Trocando o button pelo dialog tringger */}
            <Dialog.Trigger className="text-justify flex flex-col bg-slate-700 gap-3 p-5 rounded-md  hover:ring-2 hover: ring-slate-600 transition h-80" onClick={openBoardCard}>

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

                        <div className='h-[90vh] w-[100vw] sm:h-[60vh] sm:w-[70vw] md:flex flex-col gap-3 p-5 bg-slate-700 rounded-t-md lg:w-[60vw]'> 

                            <h1 className='text-slate-200'>Adicionar nota</h1>
                            
                            {board ? 
                            <textarea onChange={contentWordsAndUpdateState} className='bg-black/10 text-white outline-none resize-none p-1' rows={10} name="myNotes" id="note" value={createNote} autoFocus/>
                             : 
                             <p className='text-slate-400'>Comece <button onClick={startVoice}className='text-lime-400'>gravando </button> uma nota em áudio ou se preferir <button className='text-lime-400' onClick={onBoard}>utilize apenas texto.</button>
                            </p>}
                        </div>

                        {isRecord ? 
                        <button className='bg-slate-800 w-full rounded-b-md p-2 text-red-500 flex justify-center items-center gap-3' onClick={stopVoice}>
                            <div className='size-3 rounded-full bg-red-500 animate-pulse'/>
                            Parar de gravar
                        </button> 
                        : <Dialog.Close className='bg-lime-400 w-full rounded-b-md p-2' onClick={addNote}>Adicionar nota</Dialog.Close>}
                    </Dialog.Content>

                </Dialog.Portal>
            
        </Dialog.Root>
    )
}