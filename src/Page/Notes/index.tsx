// imports react
import { useEffect, useState } from 'react'

// interface typescript
export interface PropsAccount{
    usernameUser:string,
    cargoUser:string,
    img:string | null
}

// import firebase
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../../Services'

// import logo
import Logo from '../../assets/imagens/Logo.svg'

//import context
import { useNotes } from '../../Context'

// Components
import { NotesCard } from '../../Components/notes-card'
import { NoteDefaultNew } from '../../Components/note-default'
import Menu from '../../Components/menuUser'

export function Notes(){


    // states - globais
    const { notes, setNotes, setId } = useNotes()

    // state - account
    const [account, setAccount] = useState<PropsAccount>({usernameUser:'',cargoUser:'',img:null})

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
                    setAccount(docSnap.data().account)
                }else{
                    createAccountAndNotesInDataBase()
                }
                
            } catch (error) {
                console.log(error)
            }
        }

        // Salvando dados na localStorage e no banco de dados
        async function createAccountAndNotesInDataBase(){
            // Criando dados dentro do banco de dados do usuario
            await setDoc(doc(db,'Users',JSON.parse(localStorage.getItem('@user') as string)),{
                Notes:[],
                account:JSON.parse(localStorage.getItem('account') as string)
            })

            // Setando na state account o valor da localStorage
            setAccount(JSON.parse(localStorage.getItem('account') as string))
        }

        // Chamando loadNotes
        loadNotes()
    },[])

    // filtrandoCards
    const filterCards = seach !== '' ? notes.filter(note => note.text.toLowerCase().includes(seach.toLowerCase())) : notes

    return(
        <main className="h-full w-full flex flex-col items-center">

            {/* Header */}
            <header className="border-b-[1px] border-b-slate-800 w-full h-24 flex justify-center items-center pl-5 pr-5 md:justify-between">
                <img src={Logo} alt='logo da nlw expert by rocketseat' className='hidden md:block md:h-10 '/>

                <Menu nameUser={account.usernameUser} cargo={account.cargoUser} img={account.img} />
                
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