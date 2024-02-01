import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Block, BlockName, Blocs } from "../../types/Block";
import { Inventory } from "../../types/Inventory";
import InventoryItem from "../Inventory/item";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import './style.css'

interface Props{
    inventory: Inventory
}

export default function CoinExchange({inventory}: Props) {
    return (<div id="coin_exchange">
        {Object.keys(inventory.blocks).map((blockName, i) => {
            const count = inventory.blocks[blockName as BlockName]
            const block = Blocs.find(b => b.name == blockName) as Block
            return <div className="coin-exchange-block">
                <InventoryItem key={i} item={block} count={count ?? 0}/>
                <div className="coin-exchange-range">
                    <FontAwesomeIcon icon={faMinus} className="shop-button top-left bottom-left"/> 
                    <input type="number" />
                    <FontAwesomeIcon icon={faPlus}/> 
                </div>
            </div>
        })}
    </div>);
}