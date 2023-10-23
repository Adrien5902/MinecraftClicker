import { Block, BlockName, BlockTag, BlockTags } from "./Block"
import { ObjectClassMap } from "./MapObjectClass"
import { Item } from './Item';

type BlockRateList = [BlockName | BlockTag, number][]
const BiomesList = {
    plains: [[[BlockTags.dirt, 10], ["log", 3]]] as [BlockRateList],
    desert: [[["sand", 10], ["sandstone", 4], ["cactus", 1]]] as [BlockRateList]
}

export type BiomeName = keyof typeof BiomesList

export type BlockRate = {block: Block, weight: number}

export class Biome implements Item{
    name: BiomeName
    blockrates: BlockRate[]

    constructor(name: BiomeName, blockrates: BlockRateList) {
        this.name = name
        this.blockrates = blockrates.map(r => r[0] instanceof BlockTag ? r[0].data.map(b => ({block: b, weight: r[1]} as BlockRate)) : [{block: Block.find(r[0]), weight: r[1]}]).flat(1)
    }

    getTexture = () => `/biomes/${this.name}.png`
    
    getRandomBlock(){
        const totalWeight = this.blockrates.reduce((prev, curr) => prev + curr.weight, 0)
        const RWeight = Math.random() * totalWeight

        let currentWeight = 0
        for(const item of this.blockrates){
            currentWeight += item.weight
            if(RWeight < currentWeight){
                return item.block
            }
        }

        return null
    }
}

export const Biomes = ObjectClassMap<Biome, typeof BiomesList>(BiomesList, Biome)