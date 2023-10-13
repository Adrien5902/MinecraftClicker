import { Block, BlockTag, BlockTags } from "./Block"

export class ToolType{
    name: string
    quickerMineBlocks: Block[]
    animation: [Keyframe[], Keyframe[], KeyframeAnimationOptions]

    constructor(name: string, quickerMineBlocks: (BlockTag | Block)[], anim: [Keyframe[] | Keyframe, Keyframe[] | Keyframe, number?, number?]){
        this.name = name
        this.quickerMineBlocks = quickerMineBlocks.map(v => v instanceof BlockTag ? v.data : [v]).flat(1)
        this.animation = [
            Array.isArray(anim[0]) ? anim[0] : [anim[0], anim[1]] as Keyframe[], 
            Array.isArray(anim[1]) ? anim[1] : [anim[1], anim[0]] as Keyframe[], 
            {duration: anim[2] ?? 100, fill: "forwards"}
        ]
    }
}

export const ToolTypes: Record<string, ToolType> = [
    new ToolType(
        "shovel", 
        [BlockTags.soil], 
        [
            [
                {transform: "rotateZ(-110deg) rotateY(180deg) translateX(-5em) translateY(1em)"},
                {transform: "rotateZ(-110deg) rotateY(180deg) translateX(-2em) translateY(-2em)"}, 
            ],
            [
                {transform: "rotateZ(-110deg) rotateY(180deg) translateX(-2em) translateY(-2em)"},
                {transform: "rotateZ(-50deg) rotateY(180deg) translateX(-2em) translateY(-2em)"},
                {transform: "rotateZ(-50deg) rotateY(180deg) translateX(-5em) translateY(1em)"},
                {transform: "rotateZ(-110deg) rotateY(180deg) translateX(-5em) translateY(1em)"},
            ],
            250
        ]
    ),

    new ToolType(
        "axe", 
        [BlockTags.wood], 
        [
            {transform: "rotateZ(-90deg)"}, 
            {transform: "rotateZ(-180deg)"}, 
        ]
    ),

    new ToolType(
        "pickaxe", 
        [BlockTags.stone], 
        [
            {transform: "rotateZ(0deg) rotateY(180deg)"}, 
            {transform: "rotateZ(-90deg) rotateY(180deg)"}, 
        ]
    ),
].reduce((prev, curr) => ({...prev, [curr.name]: curr}), {})

export class ToolLevel{
    name: string
    speed: number
    mining_level: number

    constructor(name: string, speed: number, mining_level?: number){
        this.name = name
        this.speed = speed
        this.mining_level = mining_level ?? 1
    }
}

export const ToolLevels : Record<string, ToolLevel> = ([
    new ToolLevel("hand", 1, 1),
    new ToolLevel("wood", 2, 1),
    new ToolLevel("stone", 4, 2),
    new ToolLevel("iron", 8, 3),
    new ToolLevel("gold", 16, 2),
    new ToolLevel("diamond", 32, 4),
    new ToolLevel("netherite", 64, 5),
]).reduce((prev, curr) => ({...prev, [curr.name]: curr}), {})

export class Tool{
    name: string
    multiplier: number
    speed: number
    equipped: boolean
    quickerMineBlocks: Block[]
    types: ToolType[]
    level: ToolLevel
    
    constructor(name: string, level: string, types?: string[] | string, speed?: number, multiplier?: number){
        this.name = name
        this.level = ToolLevels[level]
        this.speed = speed ?? this.level.speed
        this.multiplier = multiplier ?? 1
        this.equipped = false
        this.types = (Array.isArray(types) ? types : (types ? [types] : [])).map(n => ToolTypes[n])
        this.quickerMineBlocks = this.types?.map(t => t.quickerMineBlocks).flat(1) ?? []
    }

    equip(tools?: Tool[]){
        tools?.forEach(t => t.equipped = false)
        this.equipped = true
        return this
    }

    getSpeedOn(block: Block): number{
        if(this.quickerMineBlocks.find(b => b.name == block.name)){
            return this.speed * 2
        }else{
            return this.speed
        }
    }

    getTexture = () => "/tools/" + this.name + ".webp" 
}

export const Tools = [
    new Tool("hand", "hand"),

    new Tool("wooden-pickaxe", "wood", "pickaxe"),
    new Tool("wooden-axe", "wood", "axe"),
    new Tool("wooden-shovel", "wood", "shovel"),
    
    new Tool("stone-pickaxe", "stone", "pickaxe"),
    new Tool("stone-axe", "stone", "axe"),
    new Tool("stone-shovel", "stone", "shovel"),
    
    new Tool("iron-pickaxe", "iron", "pickaxe"),
    new Tool("iron-axe", "iron", "axe"),
    new Tool("iron-shovel", "iron", "shovel"),
    
    new Tool("golden-pickaxe", "gold", "pickaxe"),
    new Tool("golden-axe", "gold", "axe"),
    new Tool("golden-shovel", "gold", "shovel"),
    
    new Tool("diamond-pickaxe", "diamond", "pickaxe"),
    new Tool("diamond-axe", "diamond", "axe"),
    new Tool("diamond-shovel", "diamond", "shovel"),
    
    new Tool("netherite-pickaxe", "netherite", "pickaxe"),
    new Tool("netherite-axe", "netherite", "axe"),
    new Tool("netherite-shovel", "netherite", "shovel"),
]