// imports react
import { ChangeEvent, useEffect } from 'react'

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
    function filterCards(valor_digitado:string){
        document.querySelectorAll('.card').forEach(card => {

            // meus cards
            const myCard:HTMLButtonElement = card as HTMLButtonElement

            // Verificando se dentro do meu card tem o valor que eu digitei
            if(myCard.lastElementChild?.textContent?.includes(valor_digitado)){
                myCard.style.display = 'block'
            } else{
                myCard.style.display = 'none'
            }
        })
    }

    return(
        <main className="h-full w-full flex flex-col items-center">

            <header className="border-b-[1px] border-b-slate-800 w-full h-24 flex justify-between items-center pl-5 pr-5">
                <img src={Logo} alt='logo da nlw expert by rocketseat' className='h-10'/>
            </header>

            <div className="flex flex-col w-10/12 justify-center mt-10 mb-10">

                {/* input form */}
                <form className="flex justify-center">
                    <input type="text" className=" w-full bg-slate-900 outline-none text-3xl" placeholder="Busque em suas notas..." onChange={(e) => filterCards(e.target.value)}/>
                </form>

                {/* section notes */}
                <section className="grid gap-5 mt-5 md:grid-cols-2 xl:grid-cols-3  ">

                    {/* Note default */}
                    <NoteDefaultNew/>

                    {notes.map((item,idx) => <NotesCard key={idx} date={item.date} text={item.text} position={idx}/>)}

                </section>
            </div>
        </main>
    )
}