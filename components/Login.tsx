import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    console.log(username)
    console.log(password)

    const handSubmit= async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const resp = await fetch(`http://localhost:3000/users?username=${username}`,{
            method: 'GET'
        })
        .then (resposta =>{
            return resposta.json()
        })
        console.log(resp)
        if (resp.length === 0 ){
            alert('Login incorreto.')
            
        }
        else{
            if(resp[0].password !== password){
                alert('Login incorreto.')
            }
            else{
                navigate('/home', {state: {username}})
            }
        }
    
    }

    return (
        <div className="bg-slate-800 flex items-center justify-center h-screen w-screen">
            <div className="bg-gray-900 p-8 rounded-lg drop-shadow-2x1 w-96 flex-col items-center ">
                <h1 className="font-bold mb-8 text-center "> Login </h1>
                <form className='mb-4'  onSubmit={handSubmit}>
                    <div className="mb-4">
                        <label className="Block mb-2 font-semibold" htmlFor="username">
                            Username
                        </label>
                        <input type="text" id="username" value={username}
                            onChange={e => setUsername(e.target.value)}
                            className=" w-full border rounded p-2" />
                        <label className="Block mb-2 font-semibold" htmlFor="password">
                            Password
                        </label>
                        <input type="password" id="password" value={password}
                            onChange={e => setPassword(e.target.value)}
                            className=" w-full border rounded p-2" />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-rose-500 to-rose-800 mt-3 text-white font-semibold p-2 rounded transition ease-in-out delay-1 hover:-translate-y-1 hover:scale-110 hover:bg-rose-900 duration-300" >
                                Login
                    </button>
                </form>
            </div>
        </div>
    )
}