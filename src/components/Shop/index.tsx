import { Inventory } from "../../types/Inventory";
import CloseButton from "../CloseButton";
import ShopItem from "./item";
import { Automation, Slave } from "../../types/Automation";
import './style.css'
import { Item } from "../../types/Item";

interface Props{
    close: () => unknown
    inventory: Inventory
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>
}

export default function Shop({close, setInventory, inventory}: Props) {
    console.log("shop renders")
    
    function handleBuy(price: number, item: Item){
        if(!(inventory.coins >= price)){
            return
        }
        
        const audio = new Audio("/sounds/shop/buy.mp3")
        audio.play()

        setInventory(i => {
            console.log("a") //Logging twice after two buys
            const inv = {...i, coins: i.coins - price}

            console.log(inv.coins)
            if(item instanceof Automation){
                item.addToInv(inv)
            }

            return inv
        })
    }

    return (<>
        <CloseButton onClick={close}/>
        <div id="shop">
            <ShopItem 
                item={new Slave()} 
                price={50 * 2 ** (inventory.automations.slave?.count ?? 0)} 
                onBuy={handleBuy}
            />
        </div>
    </>);
}