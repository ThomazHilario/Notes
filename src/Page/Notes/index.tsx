import Logo from '../../assets/imagens/Logo.svg'

// Components
import { NotesCard } from '../../Components/notes-card'
import { NoteDefaultNew } from '../../Components/note-default'

export function Notes(){
    return(
        <main className="h-auto w-full flex flex-col items-center">

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

                    <NotesCard/>
                    <NotesCard/>
                    <NotesCard/>
                    <NotesCard/>
                    <NotesCard/>
                    <NotesCard/>
                </section>
            </div>
        </main>
    )
}