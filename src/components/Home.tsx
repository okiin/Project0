import { useEffect } from "react"
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
    const handSubmit= async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const resp = await fetch(`http://localhost:3000/users?username=${username}`,{
            method: 'GET'
        })
        .then (resposta =>{
            return resposta.json()
        })
        navigate('/produto', {state: {username}})
    }
    const exit= async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const resp = await fetch(`http://localhost:3000/users?username=${username}`,{
            method: 'GET'
        })
        .then (resposta =>{
            return resposta.json()
        })
        navigate('/', {state: {username}})
    }
             
        
    return(
        <div className="w-screen h-screen bg-slate-800 ">
           <div className="border-rose-800 bg-gradient-to-r from-rose-500 to-rose-800  p-5  ">
                 <h1 className="font-bold mb-6 text-center ">Bem vindo</h1>
            </div>
        <form  onSubmit={handSubmit}>
            <div className="bg-slate-800 flex items-center justify-center mt-10">
                <div className="bg-gray-900 rounded-lg drop-shadow-2x1  flex-col items-center "> </div>
                <ul>
                    <button className="h-20 w-40 items-center justify-center text-center">
                    Produtos <FaShopify size={20}/>
                    </button>
                </ul>
            </div>
        </form>
        <form className=" bg-slate-800" onSubmit={exit}>
            <button  
                className="h-20 w-40 items-center justify-center text-center"> Sair <BiLogIn size={20}/>
            </button>
        </form>
        </div>
       
    )
        
    

}