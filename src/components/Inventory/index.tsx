import { Inventory } from "../../types/Inventory";
import { Block, BlockName, Blocs } from "../../types/Block";
import './style.css'
import InventoryBloc from "./Blocs";

interface Props{
    inventory: Inventory
}

export default function InventoryElement({inventory}: Props) {
    return (
    <div id="inventory">
        <div id="inventory-blocks">
            {Object.keys(inventory.blocks).map(
                (name) => <InventoryBloc count={inventory.blocks[name as BlockName] ?? 0} bloc={Blocs.find(b => b.name == name) as Block}/>
            )}
        </div>

        <div id="inventory-crafting">
            
        </div>
    </div>
    );
}