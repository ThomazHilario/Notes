// imports react
import { useEffect, useState } from 'react'

// import firebase
import { getDoc, doc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../../Services'

// import logo
import Logo from '../../assets/imagens/Logo.svg'

//import context
import { useNotes } from '../../Context'

// Components
import { NotesCard } from '../../Components/notes-card'
import { NoteDefaultNew } from '../../Components/note-default'

export function Notes(){

    // states - globais
    const { notes, setNotes, setId } = useNotes()

    // state - seach
    const [seach, setSeach] = useState<string>('')

    // Buscando dados do banco de dados
    useEffect(() => {

        // Verificando se tem a chave @user na localStorage
        if(localStorage.getItem('@user') !== null){
            setId(JSON.parse(localStorage.getItem('@user') as string))
        }

        // Buscando notas do banco de dados
        async function loadNotes(){
            try {

                // Montando referencia
                const docRef = doc(db,'Users',JSON.parse(localStorage.getItem('@user') as string))

                // Buscando dados no banco de dados
                const docSnap = await getDoc(docRef)

                // Verificando se tem dados
                if(docSnap.exists()){
                    setNotes(docSnap.data().Notes)
                }
                
            } catch (error) {
                console.log(error)
            }
        }

        // Chamando loadNotes
        loadNotes()
    },[])

    // filtrandoCards
    const filterCards = seach !== '' ? notes.filter(note => note.text.toLowerCase().includes(seach.toLowerCase())) : notes

    // singOut
    async function singOut(){

        // Saindo da conta
        await signOut(auth)

        // Removendo uid da localStorage
        localStorage.removeItem('@user')

    }

    return(
        <main className="h-full w-full flex flex-col items-center">

            {/* Header */}
            <header className="border-b-[1px] border-b-slate-800 w-full h-24 flex justify-between items-center pl-5 pr-5">
                <img src={Logo} alt='logo da nlw expert by rocketseat' className='h-10'/>

                <button onClick={singOut}>sair</button>
            </header>

            {/* Container */}
            <div className="flex flex-col w-10/12 justify-center mt-10 mb-10">

                {/* input form */}
                <form className="flex justify-center">
                    <input type="text" className=" w-full bg-slate-900 outline-none text-3xl" placeholder="Busque em suas notas..." onChange={(e) => setSeach(e.target.value)}/>
                </form>

                {/* section notes */}
                <section className="grid gap-5 mt-5 md:grid-cols-2 xl:grid-cols-3  ">

                    {/* Note default */}
                    <NoteDefaultNew/>

                    {filterCards.map((item,idx) => <NotesCard key={idx} date={item.date} text={item.text} position={idx}/>)}

                </section>
            </div>
        </main>
    )
}