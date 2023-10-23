import { Biome, BiomeName, Biomes } from "../../../types/Biome";
import BiomeElement from "./element";

interface Props{
    currBiome: Biome
    setBiome: (biome: Biome) => unknown
}

export default function BiomeSelect({currBiome, setBiome}: Props) {
    return (<>
        <div id='biomes'>
            {Object.keys(Biomes).map((n, i) => {
                const biome = Biomes[n as BiomeName]
                return <BiomeElement onClick={() => setBiome(biome)} selected={currBiome == biome} key={i} biome={biome}></BiomeElement>
            })}
        </div>
    </>);
}