import { Item } from "./Item"
import { ObjectClassMap } from "./MapObjectClass"

//{BlockName : [Hardness]}
export const BlockList = {
    dirt: [10],
    grass: [20],
    planks: [40],
    log: [80],
    stone: [50],
    "coal-ore": [100],
    "iron-ore": [150],
    "copper-ore": [150],
    "gold-ore": [200],
    "lapis-ore": [200],
    "redstone-ore": [250],
    "diamond-ore": [500],
    "emerald-ore": [500],
    sand: [20],
    sandstone: [80],
    cactus: [50],
    tnt: [100],
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

    static find = (name: BlockName) => Blocs.find(b => b.name == name) as Block
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
const DirtTag = new BlockTag("dirt", "dirt", "grass")

export const BlockTagsList = {
    dirt: [DirtTag],
    soil: [DirtTag, "sand"],
    ores: [OresTag],
    stones: ["stone", "sandstone", OresTag, "obsidian"],
    wood: ["log", "planks"]
}

export type BlockTagsName = keyof typeof BlockTagsList

export const BlockTags = ObjectClassMap<BlockTag, typeof BlockTagsList>(BlockTagsList, BlockTag)