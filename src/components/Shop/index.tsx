import { Inventory } from "../../types/Inventory";
import CloseButton from "../CloseButton";
import ShopItem from "./item";
import { Automation, Slave } from "../../types/Automation";
import './style.css'
import { Item } from "../../types/Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { nFormatter } from "../../types/functions";
import CoinExchange from "./coin_exchange";
import { useState } from "react";

interface Props{
    close: () => unknown
    inventory: Inventory
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>
}

export default function Shop({close, setInventory, inventory}: Props) {    
    const [coinExchange, setCoinExchange] = useState(false) 

    function handleBuy(price: number, item: Item){
        if(!(inventory.coins >= price)){
            return
        }
        
        const audio = new Audio("/sounds/shop/buy.mp3")
        audio.play()

        setInventory(i => {
            const inv = {...i, coins: i.coins - price}

            if(item instanceof Automation){
                item.addToInv(inv)
            }

            return inv
        })
    }

    return (<>
        <CloseButton onClick={() => coinExchange ? setCoinExchange(false) : close()}/>
        {
            coinExchange ?
            <CoinExchange inventory={inventory}/>
            :
            <div id="shop">
                <div id="shop-coin-plus" onClick={() => setCoinExchange(true)}>
                    <span>{nFormatter(inventory.coins)}</span>
                    <img src="/coin.png" alt="" />
                    <span className="shop-button shop-coin-pplus"><FontAwesomeIcon icon={faPlus}/></span>
                </div>
                <ShopItem 
                    item={new Slave()} 
                    price={50 * 2 ** (inventory.automations.find(a => a.name == "slave")?.count ?? 0)} 
                    onBuy={handleBuy}
                />
            </div>
        }
    </>);
}