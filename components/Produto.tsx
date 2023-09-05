
interface ProdutoProps {
    nome: string,
    descricao: string,
    qtde: number,
    preco: number
}

export function Produto(prod: ProdutoProps) {

    return (
        <div className="text-white  m-2 flex items-center justify-center"> 
            Nome: {prod.nome}
            Descrição: {prod.descricao}
            Qtde: {prod.qtde}
            Preço: {prod.preco}
        </div>
    )
}