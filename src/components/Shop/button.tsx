import { nFormatter } from "../../types/functions"

interface Props{
    price: number
    onBuy: () => unknown
    soldOut: boolean
}

export default function ShopButton({price, onBuy, soldOut}: Props) {
    function handleClick(){
        onBuy()
    }

    return (<button className="shop-button bottom-left bottom-right" onClick={handleClick} data-soldout={soldOut}>
        <span>{nFormatter(price)}</span>
        <img src="/coin.png" alt="🪙" draggable={false}/>
    </button>);
}