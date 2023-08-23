import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { MdShoppingCart, MdSell } from "react-icons/md"

interface ProdutoProps {
    id: number,
    name: string,
    description: string,
    price: number,
    qtde: number
}

export function ProdutoP(){
    const location = useLocation()

    const username = location.state?.username || ''

    const [products, setProducts] = useState<ProdutoProps[]>([])

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

    return (
        <div className=" bg-slate-800 flex flex-col items-center justify-center h-screen w-screen">
            <div className=" max-w-md mx-auto">
                <div className=" h-14 bg-gradient-to-r from-rose-500 to-rose-800 text-bold rounded-xl mb-5">
                    <h2 className="flex items-center justify-center text-4xl font-bold ">Lista de Produtos</h2>
                </div>
                <table className="w-full border border-gray-300r">
                    <thead>
                        <tr className="bg-slate-700">
                            <th className="border border-rose-800 bg-gradient-to-r from-rose-500 to-rose-800 px-4 py-2">Id</th>
                            <th className="border border-rose-800 bg-gradient-to-r from-rose-500 to-rose-800 px-4 py-2">Nome</th>
                            <th className="border border-rose-800 bg-gradient-to-r from-rose-500 to-rose-800 px-4 py-2">Descrição</th>
                            <th className="border border-rose-800 bg-gradient-to-r from-rose-500 to-rose-800 px-4 py-2">Preço</th>
                            <th className="border border-rose-800 bg-gradient-to-r from-rose-500 to-rose-800 px-4 py-2">Quantidade</th>
                            <th className="border border-rose-800 bg-gradient-to-r from-rose-500 to-rose-800 px-4 py-2">Compra</th>
                            <th className="border border-rose-800 bg-gradient-to-r from-rose-500 to-rose-800 px-4 py-2">Venda</th>
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
                                            <button>
                                                <MdShoppingCart size={20} />
                                            </button>
                                        </td>
                                        <td className="border border-zinc-950 bg-slate-900 to-slate-800 px-4 py-2">
                                            <button>
                                                <MdSell size={20} />
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