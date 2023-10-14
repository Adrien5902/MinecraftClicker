import { Item } from '../../types/Item';
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
            <span className="inventory-item-name">{item.name.split("-").map(s => s.slice(0, 1).toUpperCase() + s.slice(1)).join(" ")}</span>
            {count !== false ? <span className="inventory-item-count">{count}</span> : ""}
        </div>
    );
}