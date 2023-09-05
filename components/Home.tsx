import { useEffect, FormEvent } from "react"
import {  useLocation, useNavigate } from "react-router-dom"
import { FaShopify  } from "react-icons/fa"
import { BiLogIn } from "react-icons/bi"
export function Home() {

    const location = useLocation()
    const username = location.state?.username || ''

    useEffect(() => {
        const getHome = async () => {
            try {
                const res = await fetch(`http://localhost:3000/home`, { method: 'GET' })

                if (res.ok) {
                    alert('Bem vindo')
                }
                else {
                    console.log('falha na busca por dados')
                }
            } catch (e) {
                console.log(e)
            }
        }
        getHome()
    }, [username])
    
    const navigate = useNavigate()
    //produto navigate
    const produtos= async(e: FormEvent) =>{
        e.preventDefault()
        
        await fetch(`http://localhost:3000/users?username=${username}`,{
            method: 'GET'
        })
        .then (resposta =>{
            return resposta.json()
            
            
        })
        navigate('/produto', {state: {username}})
        

    }
    // login/exit
    const exit= async(e: FormEvent) =>{
        e.preventDefault()
        navigate('/', {state: {username}})
    }
             
        
    return(
        <div className="w-screen h-screen bg-slate-800 ">
           <div className="border-rose-800 bg-gradient-to-r from-rose-500 to-rose-800  p-5  ">
                 <h1 className="font-bold mb-6 text-center ">Bem vindo {username}</h1>
         </div>
            <div id="alert-3" className="mt-10 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                    <div className="ml-3 text-sm font-medium">
                      Login feito com Sucesso
                    </div>
                    <button type="button" className="ml-5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
             </div>
         
              <div className="bg-slate-800 flex items-center justify-center mt-10">
                <div className="bg-gray-900 rounded-lg drop-shadow-2x1  flex-col items-center "> </div>
                <div className="flex-col items-center text-center justify-center">
                    <button 
                         onClick={exit} className="mr-10 h-20 w-40 items-center justify-center text-center">  Sair <BiLogIn size={20}/>
                    </button>
                    <button  
                         onClick={produtos} className="ml-80 h-20 w-40 items-center justify-center text-center"> Produtos <FaShopify size={20}/>
                    </button>
                </div>
            </div>
           
        </div>
       
    )
        
    

}
