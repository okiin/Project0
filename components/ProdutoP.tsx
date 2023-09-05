import { useEffect, useState,  } from "react"
import { useLocation } from "react-router-dom"
import { MdShoppingCart, MdSell  } from "react-icons/md"
import { BiXCircle } from "react-icons/bi";
import React from "react" 
import  {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
interface ProdutoProps {
    id: number,
    name: string,
    description: string,
    price: number,
    qtde: number
}

interface OrderProps {
    id: number,
    product_id: number,
    price: string,
    qtde: number,
    type: string
}

export function ProdutoP(){
    const location = useLocation()
    const [orders, setOrders] = useState<OrderProps[]>([])
    const username = location.state?.username || ''
    const [products, setProducts] = useState<ProdutoProps[]>([])
    console.log(products)
    const [name, setName] = useState ('')
    const [description, setDescription] = useState ('')
    const [price, setPrice] = useState ('')
    const [qtde, setQtde] = useState ('')
    

  
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(`http://localhost:3000/products`, { method: 'GET' })
                const products = await res.json()

                if (res.ok) {
                    setProducts(products)
                    
                }
                else {
                    console.log('falha na busca por dados')
                }
            } catch (e) {
                console.log(e)
            }
        }
        getProducts()
    }, [username])
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto produto
        const produto = {
          name,
          description,
          price,
          qtde
        }
        try {
          // chamar a API para cadastrar o produto
          const produtoCadastrado = await fetch(`http://localhost:3000/products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de produtos
           // monta uma nova lista com a lista anterior + produto cadastrado
          setProducts([...products, produtoCadastrado])
          }
        catch(error) {
          console.log(error)
        }
    
      }
      const handleBuy = async (id: number) => {
        const quantity = Number(prompt('Quantidade de produtos a comprar'))
        const price = Number(prompt('Preço do produto a comprar'))
        // cria objeto para inserção
        const obj = {
          product_id: id,
          qty: quantity,
          price: price,
          type: 'buy'
        }
        // chamamos a API para inserir a compra no banco de dados
        const newOrder = await fetch(`http://localhost:3000/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },  
          body: JSON.stringify(obj)
        })
        .then( response => {
            return response.json()
        })  
        .catch(error => {
            alert(error)
        })

          // atualiza a lista de orders
       // monta uma nova lista com a lista anterior + ordem cadastrado
      setOrders([...orders, newOrder])

    }


      

    const handleSell = async(id:number) =>{
        const quantity = Number(prompt('Quantidade de produtos a vender'))
        const price = Number (prompt('Preço de venda'))

        const obj = {
            product_id: id,
            qtde: quantity,
            price: price,
            type: 'sell'

        }   

        const newOrder = await fetch(`http://localhost:3000/orders`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },  
            body: JSON.stringify(obj)
          })
          .then( response => {
              return response.json()
          })  
          .catch(error => {
              alert(error)
          })
          setOrders([...orders, newOrder])
       

    }
    const handleRemove = async (id:number) =>{
        let confirma = confirm('Confirma a remoção do produto?')
        if(confirma){
            await fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE'
            })
            .then( res => {
                return res.json()
            })
            .catch(error => {
                alert(error)
            })
            setProducts(products.filter((product) => product.id !== id ))
            
        }
    }
    
    
    return (
        <div className=" bg-slate-800 flex flex-col items-center justify-center h-screen w-screen ">
            <div  className=" max-w-md mx-auto">
                <div className=" h-14 bg-gradient-to-r from-rose-500 to-rose-800 text-bold rounded-xl mb-5 ">
                    <h2 className="flex items-center justify-center text-4xl font-bold ">Cadastro de Produtos</h2>
                </div>
                <form  onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
                        <div>
                            <label htmlFor="name" className="block font-bold text-3x1 mb-2">Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName (e.target.value)} className="w-full bg-slate-800 px-3 py-2 border border-rose-500 rounded-md shadow-sm mb-2"></input>
                        </div>
                        <div>
                            <label htmlFor="name" className="block font-bold text-3x1 mb-2">Description</label>
                            <textarea id="description" value={description} onChange={(e) =>  setDescription(e.target.value)} className="bg-slate-800 w-full border border-rose-500 rounded-md shadow-sm  mb-2">
                             </textarea>
                        </div>
                        <div>
                            <label htmlFor="price" className="block font-bold text-3x1 mb-2">
                                Price
                            </label>
                            <input type="number" id="price" value={price} onChange={(e) => setPrice (e.target.value)} className="w-full bg-slate-800 px-3 py-2 border border-rose-500 rounded-md shadow-sm mb-2"   >
                            </input>
                        </div>
                        <div>
                            <label  htmlFor="qtde" className="block font-bold text-3x1 mb-2">
                                Qtde
                                <input type="number" id="qtde" value={qtde} onChange={(e) => setQtde (e.target.value)} className="w-full bg-slate-800 px-3 py-2 border border-rose-500 rounded-md shadow-sm mb-2">
                                </input>
                            </label>
                        </div>

                        <button  type="submit" className="mb-4text-bold relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-rose-900 rounded-lg group bg-gradient-to-br from-rose-600 to-rose-500 group-hover:from-rose-600 group-hover:to-rose-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-full">
                            <span  className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
                                        Enviar
                            </span>
                        </button>
                       

                </form>
               
                <table className="w-full border border-gray-300r  ">
                    <thead>
                        <tr className="bg-gradient-to-r from-rose-500 to-rose-800 ">
                            <th className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-gray-800 border border-zinc-950 px-4 py-2">Id</th>
                            <th className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-gray-800 border border-zinc-950 px-4 py-2">Nome</th>
                            <th className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-gray-800 border border-zinc-950 px-4 py-2">Descrição</th>
                            <th className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-gray-800 border border-zinc-950 px-4 py-2">Preço</th>
                            <th className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-gray-800 border border-zinc-950 px-4 py-2">Quantidade</th>
                            <th className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-gray-800 border border-zinc-950 px-4 py-2">Compra</th>
                            <th className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-gray-800 border border-zinc-950 px-4 py-2">Venda</th>
                            <th className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-gray-800 border border-zinc-950 px-4 py-2">Excluir</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            (products[0])
                                ?
                                products.map((product) => (
                                    <tr key={product.id}>
                                
                                        <td className="border bg-slate-900 px-4 py-2 border-zinc-950 text-bold">{product.id}</td>
                                        <td className="border bg-slate-900 px-4 py-2 border-zinc-950 text-bold">{product.name}</td>
                                        <td className="border bg-slate-900 px-4 py-2 border-zinc-950 text-bold">{product.description}</td>
                                        <td className="border bg-slate-900 px-4 py-2 border-zinc-950 text-bold">{product.price}</td>
                                        <td className="border bg-slate-900 px-4 py-2 border-zinc-950 text-bold">{product.qtde}</td>
                                        <td className="border bg-slate-900 px-4 py-2 border-zinc-950">
                                            <button className="bg-gradient-to-r from-g-900 to-gray-900"onClick={() => handleBuy(product.id)}>
                                                <MdShoppingCart size={20} />
                                            </button>
                                        </td>
                                        <td className="border border-zinc-950 bg-slate-900  px-4 py-2">
                                            <button onClick={() => handleSell(product.id)}>
                                                <MdSell size={20} />
                                            </button>
                                        </td>
                                        <td className="border bg-slate-900 px-4 py-2 border-zinc-950">
                                        <button onClick={() => handleRemove(product.id)}>
                                                <BiXCircle size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                :
                                <p>Não há produtos</p>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}