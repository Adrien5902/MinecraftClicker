import { Item } from "../../types/Item";
import { formatItemName } from "../../types/functions";
import ShopButton from "./button";

interface Props {
    item: Item,
    price: number,
    onBuy: (price: number, item: Item) => void
    soldOut?: boolean
}

export default function ShopItem({
    item,
    price,
    onBuy,
    soldOut = true
}: Props) {
    return (<div className="shop-item">
        <img src={item.getTexture()} alt={item.name} draggable={false}/>
        <span>{formatItemName(item.name)}</span>
        <ShopButton soldOut={soldOut} price={price} onBuy={() => {onBuy(price, item)}}/>
    </div>);
}