//{BlockName : [Hardness]}
export const BlockList = {
    dirt: [10],
    grass: [20],
    planks: [40],
    wood: [80],
    stone: [50],
    diamond_ore: [500]
}

export type BlockName = keyof typeof BlockList

export class Block{
    name: BlockName
    hardness: number

    constructor(name: BlockName, hardness: number){
        this.name = name
        this.hardness = hardness
    }

    getTexture = () => "/blocks/" + this.name + ".png"
}

//@ts-ignore
export const Blocs = (Object.keys(BlockList) as BlockName[]).map(name => new Block(name, ...BlockList[name]))

export class BlockTag{
    name: string
    values : (BlockTag | BlockName)[]
    data: Block[]

    constructor(name: string, ...values: (BlockTag | BlockName)[]){
        this.name = name
        this.values = values
        this.data = values.map(v => v instanceof BlockTag ? v.data : [Blocs.find(b => b.name == v) as Block]).flat(1)
    }
}

const OresTag = new BlockTag("ores", "diamond_ore")
const WoodTag = new BlockTag("wood", "wood", "planks")

export const BlockTags = {
    soil: new BlockTag("dirt", "dirt", "grass"),
    ores: OresTag,
    stone: new BlockTag("stone", "stone", OresTag),
    wood: WoodTag
}