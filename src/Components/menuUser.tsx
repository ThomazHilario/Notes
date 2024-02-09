import * as Dialog from '@radix-ui/react-dialog'
import { DialogContent } from '@radix-ui/themes'

// lucide icons
import { Upload } from 'lucide-react'

// import react router dom
import { useNavigate } from 'react-router-dom'

// import firebase
import { signOut } from 'firebase/auth'
import { db, auth, storage } from '../Services'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import { updateDoc, doc } from 'firebase/firestore'

// Imports react
import { useNotes } from '../Context'
import { ChangeEvent } from 'react'
import { toast } from 'sonner'

interface PropsMenu{
    nameUser:string,
    cargo:string,
    img:string | null,
}

export default function Menu({nameUser, cargo, img}:PropsMenu){

    // state - id
    const { id } = useNotes()

    // navigate
    const navigate = useNavigate()

    // uploadImage
    function uploadImage(){
        document.getElementById('sendImage')?.click()
    }

    // changeImage
    async function changeImage(e:ChangeEvent){
        try {
            // input 
            const input:HTMLInputElement = e.target as HTMLInputElement

            // files
            const files = input.files?.length === 1 ? input.files : null

            if(files !== null){
                // Criando uma urlLocal de momento
                const urlLocal = URL.createObjectURL(files[0])
                
                // Atualizando source das imagens
                document.querySelectorAll('.imgUser').forEach((img:any) => {
                    img.src = urlLocal
                })

                // referencia da imagem
                const imageRef = ref(storage, `Images/${id}/${files[0].name}`)

                // Fazendo upload da imagem para a storage
                await uploadBytes(imageRef,files[0])

                // Buscando imagem da storage e gerando uma url da imagem
                const urlStorage = await getDownloadURL(ref(storage, `Images/${id}/${files[0].name}`))

                // Referencia do banco de dados
                const docRef = doc(db,'Users',id)

                // Adicionando url da imagem ao banco de dados do usuario
                await updateDoc(docRef,{
                    'account.img':urlStorage
                })

            }
        } catch (error) {
            console.log(error)
        }finally{
            toast.message("A sua foto foi atualizada")
        }
    }

    // singOut
    async function singOut(){

        // Saindo da conta
        await signOut(auth)

        // Removendo uid da localStorage
        localStorage.removeItem('@user')

        localStorage.removeItem('account')

        // Voltando para a pagina de login
        navigate('/')
    
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className='bg-gray-950/30 w-60 rounded-md p-2'>
                <div className='flex'>
                    <img className='rounded-full h-11 w-11 object-cover imgUser' src={typeof img === 'string' ? img : 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop'}  />

                    <div className='flex flex-col pl-4'>
                        <p className='font-bold text-left'>
                            {nameUser}
                        </p>
                        <p className='text-gray-400 font-light text-xs'>
                            {cargo}
                        </p>
                    </div>
                </div>
            </Dialog.Trigger>

            
            <Dialog.Portal>
                <DialogContent className=' absolute top-20 right-1/2 translate-x-1/2 md:top-20 md:right-[1.20rem] md:translate-x-0 bg-gray-950/30 w-60  flex justify-center items-center flex-col gap-10 py-8'>
                 <div>
                    {/* input */}
                    <input type='file' className='hidden' id='sendImage' onChange={changeImage}/>

                    {/* icon */}
                    <button className=' transition ease-out duration-200 cursor-pointer opacity-0 flex justify-center items-center absolute top-8 left-20 rounded-full h-20 w-20 hover:bg-gray-500/30 hover:opacity-100' onClick={uploadImage}><Upload color='white'/></button>

                    {/* imagem de perfil */}
                    <img className='object-cover rounded-full h-20 w-20 imgUser' src={typeof img === 'string' ? img : 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop'} />
                 </div>

                 <button onClick={singOut} className='bg-blue-600 text-white font-bold rounded-sm h-7 w-[50%]'>Sair</button>


                </DialogContent>
            </Dialog.Portal>
            
        </Dialog.Root>
    )
}