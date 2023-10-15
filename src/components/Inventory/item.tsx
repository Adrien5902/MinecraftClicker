import { Item } from '../../types/Item';
import { formatItemName, nFormatter } from '../../types/functions';
import './style.css'

interface Props{
    item: Item
    count: number | false
    type?: string
}

export default function InventoryItem({item, count, type}: Props) {
    type = type ?? item.constructor.name

    function handleDrag(e: React.DragEvent){
        e.dataTransfer.setData("text", `${type}:${item.name}`)
    }

    return (
        <div className="inventory-item">
            <img src={item.getTexture()} onDragStart={handleDrag}/>
            <span className="inventory-item-name">{formatItemName(item.name)}</span>
            {count !== false ? <span className="inventory-item-count">{nFormatter(count)}</span> : ""}
        </div>
    );
}