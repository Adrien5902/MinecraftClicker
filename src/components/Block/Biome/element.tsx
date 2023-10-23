import { Biome } from "../../../types/Biome";
import { formatItemName } from "../../../types/functions";

interface Props{
    biome: Biome
    selected?: boolean
}

export default function BiomeElement({biome, selected = false}: Props) {
    return (<div className="biome" data-selected={String(selected)}>
        <img src={biome.getTexture()} />
        <span>{formatItemName(biome.name)}</span>
    </div>);
}