import { Biome } from "../../../types/Biome";
import { formatItemName } from "../../../types/functions";

interface Props{
    biome: Biome
    selected?: boolean
    onClick?: () => unknown
}

export default function BiomeElement({biome, selected = false, onClick}: Props) {
    return (<div onClick={onClick} className="biome" data-selected={String(selected)}>
        <img src={biome.getTexture()} />
        <span>{formatItemName(biome.name)}</span>
    </div>);
}