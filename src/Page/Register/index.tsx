// tipagem
import { LoginType } from '../Home/type'

// import firebase auth
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Services'

// import link
import { Link, useNavigate } from 'react-router-dom'

// import hook form
import { useForm } from 'react-hook-form'

// import logo
import Logo from '../../assets/imagens/Logo.svg'

export function Register(){
    // navigate
    const navigate = useNavigate()

    // Buscando o handle eo register
    const { handleSubmit, register } = useForm<LoginType>()

    // Criando usuario 
    async function registerUser({email,password}:LoginType){
        try {

            // Criando usuarioe armazenando dados na state
            const user = await createUserWithEmailAndPassword(auth,email,password)

            // Salvando uid do usuario na localStorage
            localStorage.setItem('@user',JSON.stringify(user.user.uid))

            // navegando ate a pagina do usuario
            navigate('/notes')

        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <main className="h-screen flex justify-center items-center">

            <form className="flex flex-col gap-5 border border-gray-600 rounded-sm p-5 pt-5 pb-5" onSubmit={handleSubmit(registerUser)}>

                {/* imagem da nlw expert */}
                <img src={Logo} alt='logo da nlw' className='h-10'/>


                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label>Email:</label>
                    <input type="email" placeholder="Digite seu email" className="bg-gray-700 rounded-sm pl-2 h-8 w-64" {...register('email')}/>
                </div>

                {/* Senha */}
                <div className="flex flex-col gap-1">
                    <label>Password:</label>
                    <input type="password" placeholder="Digite sua Senha" className="bg-gray-700 rounded-sm pl-2 h-8 w-64" {...register('password')}/>
                </div>

                <div className='flex flex-col justify-center'>
                    <button className="bg-slate-800 h-9 rounded-sm w-64">Cadastrar</button>
                    <p className='text-sm mt-3 text-center'>Já possui uma conta? <Link to='/' className='text-purple-700'>Entrar</Link></p>
                </div>
            </form>
        </main>
    )
}