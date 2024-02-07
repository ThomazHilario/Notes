// imports react
import { useEffect } from 'react'

// import firebase
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../Services'

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

    // Buscando dados do banco de dados
    useEffect(() => {

        // Verificando se tem a chave @user na localStorage
        if(localStorage.getItem('@user') !== null){
            setId(JSON.parse(localStorage.getItem('@user') as string))
        }

        // Buscando notas do banco de dados
        async function loadNotes(){
            try {
                const docRef = doc(db,'Users',JSON.parse(localStorage.getItem('@user') as string))

                const docSnap = await getDoc(docRef)

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

    return(
        <main className="h-full w-full flex flex-col items-center">

            <header className="border-b-[1px] border-b-slate-800 w-full h-24 flex justify-between items-center pl-5 pr-5">
                <img src={Logo} alt='logo da nlw expert by rocketseat' className='h-10'/>
            </header>

            <div className="flex flex-col w-10/12 justify-center mt-10 mb-10">

                {/* input form */}
                <form className="flex justify-center">
                    <input type="text" className=" w-full bg-slate-900 outline-none text-3xl" placeholder="Busque em suas notas..."/>
                </form>

                {/* section notes */}
                <section className="grid grid-cols-3 gap-5 mt-5 ">

                    {/* Note default */}
                    <NoteDefaultNew/>

                    {notes.map((item,idx) => <NotesCard key={idx} date={new Date(item.date.seconds)} text={item.text}/>)}

                </section>
            </div>
        </main>
    )
}