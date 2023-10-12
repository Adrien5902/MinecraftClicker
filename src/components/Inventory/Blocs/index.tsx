import { Block } from "../../../types/Block";
import './style.css'

interface Props{
    bloc: Block
    count: number
}

export default function InventoryBloc({bloc, count}: Props) {
    return (
        <div className="inventory-block">
            <img src={bloc.getTexture()}/>
            <span className="inventory-block-name">{bloc.name.slice(0, 1).toUpperCase() + bloc.name.slice(1)}</span>
            <span className="inventory-block-count">{count}</span>
        </div>
    );
}