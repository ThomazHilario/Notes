import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// Tipagem 
import { LoginType } from './type'

// logo
import Logo from '../../assets/imagens/Logo.svg'

export function Home(){
    // Buscando o handle eo register
    const { handleSubmit, register } = useForm<LoginType>()

    // logando usuario
    function loginUser({email,password}:LoginType){
        if(email !== '' && password !== ''){
            console.log('ok')
        }
    }

    return (
        <main className="h-screen flex justify-center items-center">

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
        </main>
    )
}