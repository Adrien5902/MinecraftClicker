import { Item } from "./Item"
import { ObjectClassMap } from "./MapObjectClass"

//{BlockName : [Hardness]}
export const BlockList = {
    dirt: [10],
    grass: [20],
    planks: [40],
    log: [80],
    stone: [50],
    coal_ore: [100],
    iron_ore: [150],
    copper_ore: [150],
    gold_ore: [200],
    lapis_ore: [200],
    redstone_ore: [250],
    diamond_ore: [500],
    emerald_ore: [500],
    obsidian: [10000],
}

export type BlockName = keyof typeof BlockList

export class Block implements Item{
    name: BlockName
    hardness: number

    constructor(name: BlockName, hardness: number){
        this.name = name
        this.hardness = hardness
    }

    getTexture = () => "/blocks/" + this.name + ".png"
}

export const Blocs = (Object.keys(BlockList) as BlockName[]).map(name => new Block(name, BlockList[name][0]))

export class BlockTag {
    name: string;
    values: (BlockTag | BlockName)[];
    data: Block[];

    constructor(name: string, ...values: (BlockTag | BlockName)[]) {
        this.name = name;
        this.values = values;
        this.data = values
            .map((v) => 
                v instanceof BlockTag ?
                    v.data
                    : [Blocs.find((b) => b.name === v) as Block]
            )
            .flat(1);
    }
}

const OresTag = new BlockTag("ores", ...(Object.keys(BlockList) as BlockName[]).filter(n => n.includes("ore")))

export const BlockTagsList = {
    soil: ["dirt", "grass"],
    ores: [OresTag],
    stones: ["stone", OresTag, "obsidian"],
    wood: ["log", "planks"]
}

export const BlockTags = ObjectClassMap<BlockTag, typeof BlockTagsList>(BlockTagsList, BlockTag)