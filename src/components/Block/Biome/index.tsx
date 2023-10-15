import { Biome } from "../../../types/Biome";
import { formatItemName } from "../../../types/functions";

interface Props{
    biome: Biome
}

export default function BiomeElement({biome}: Props) {
    return (<div className="biome">
        <img src={biome.getTexture()} />
        <span>{formatItemName(biome.name)}</span>
    </div>);
}