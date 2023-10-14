import { Inventory } from "../../types/Inventory";
import { Block, BlockName } from "../../types/Block";
import './style.css'
import InventoryItem from "./item";

interface Props{
    inventory: Inventory
}

export default function InventoryElement({inventory}: Props) {
    return (
    <div id="inventory">
        <div id="inventory-blocks">
            <div className="inventory-group">
                <img src="/blocks/grass.png" draggable={false}/>
                <span>Blocs :</span>
            </div>
            {Object.keys(inventory.blocks).map(
                (name, i) => <InventoryItem key={i} count={inventory.blocks[name as BlockName] ?? 0} item={Block.find(name as BlockName)}/>
            )}
        </div>

        <div id="inventory-tools">
            <div className="inventory-group">
                <img src="/tools/diamond-pickaxe.webp" draggable={false}/>
                <span>Tools :</span>
            </div>
            {inventory.tools.map(
                (tool, i) => <InventoryItem key={i} count={false} item={tool}/>
            )}
        </div>
    </div>
    );
}