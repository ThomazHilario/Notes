// imports react hooks
import { useState, useEffect } from 'react'

// Import firebase auth
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../Services'

// Import link and useNavigate
import { Link, useNavigate } from 'react-router-dom'

// Import hook form
import { useForm } from 'react-hook-form'

// Tipagem 
import { LoginType } from './type'

// logo
import Logo from '../../assets/imagens/Logo.svg'

export function Home(){
    // navigate
    const navigate = useNavigate()

    // state - loading
    const [loading, setLoading] = useState<boolean>(true)  

    // Verificando autenticação do firebase
    useEffect(() => {
        // verifyAuth
        function verifyAuth(){
            onAuthStateChanged(auth, (user) => {
                if(user){
                    navigate('/notes')
                    setLoading(false)
                }

                setLoading(false)
            })
        }

        // Executando verifyAuth
        verifyAuth()
    },[])

    // Buscando o handle eo register
    const { handleSubmit, register } = useForm<LoginType>()

    // logando usuario
    async function loginUser({email,password}:LoginType){
        if(email !== '' && password !== ''){

            setLoading(true)

            // Logando usuario
            const user = await signInWithEmailAndPassword(auth, email, password)

            // Salvando uid na localStorage
            localStorage.setItem('@user',JSON.stringify(user.user.uid))

            // navegando para a rota notes
            navigate('/notes')
        }
    }

    return (
        <main className="h-screen flex justify-center items-center">
            
            {loading ? 
                <button type="button" className="bg-indigo-500 ... rounded-sm flex justify-center items-center w-[220px] h-12" disabled>
                    <svg className="rounded-full border-[8px] border-dotted border-white animate-spin size-9 mr-3 ..." viewBox="0 0 24 24">
                        {/* Animation  */}
                    </svg>
                    <p className='text-2xl'>Loading</p>
                </button>
                :
                <form className="flex flex-col gap-5 border border-gray-600 rounded-sm p-5 pt-5 pb-5" onSubmit={handleSubmit(loginUser)}>

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
                        <button className="bg-slate-800 h-9 rounded-sm w-64">Entrar</button>
                        <p className='text-sm mt-3 text-center'>Não possui uma conta? <Link to='/register' className='text-purple-700'>Cadastre-se</Link></p>
                    </div>
                </form>
            }

        </main>
    )
}

/* 

*/