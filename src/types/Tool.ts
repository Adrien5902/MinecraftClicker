import { Block, BlockTag, BlockTags } from "./Block"
import { Item } from "./Item"
import { ObjectClassMap } from "./MapObjectClass"

export class ToolType{
    name: string
    quickerMineBlocks: Block[]
    animation: [Keyframe[], Keyframe[], KeyframeAnimationOptions]
    speedMultiplier: number

    constructor(name: string, quickerMineBlocks: (BlockTag | Block)[], anim: [Keyframe[] | Keyframe, Keyframe[] | Keyframe, number?], speedMultiplier? : number){
        this.name = name
        this.quickerMineBlocks = quickerMineBlocks.map(v => v instanceof BlockTag ? v.data : [v]).flat(1)
        this.animation = [
            Array.isArray(anim[0]) ? anim[0] : [anim[0], anim[1]] as Keyframe[], 
            Array.isArray(anim[1]) ? anim[1] : [anim[1], anim[0]] as Keyframe[], 
            {duration: anim[2] ?? 100, fill: "forwards"}
        ]
        this.speedMultiplier = speedMultiplier ?? 2
    }
}

const ToolTypesList = {
    "hand": [
        [],
        [
            {transform: "rotateZ(-45deg) scale(0.4) translateX(30em) translateY(2em)", "transformOrigin": "center"}, 
            {transform: "rotateZ(-105deg) scale(0.4) translateX(10em) translateY(12em)", "transformOrigin": "center"}, 
        ]
    ],

    "shovel": [  
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
    ],

    "axe": [  
        [BlockTags.wood], 
        [
            {transform: "rotateZ(-90deg)"}, 
            {transform: "rotateZ(-180deg)"}, 
        ]
    ],

    "pickaxe": [  
        [BlockTags.stones], 
        [
            {transform: "rotateZ(0deg) rotateY(180deg)"}, 
            {transform: "rotateZ(-90deg) rotateY(180deg)"}, 
        ]
    ],
}

export const ToolTypes = ObjectClassMap<ToolType, typeof ToolTypesList>(ToolTypesList, ToolType) 
type ToolTypeNames = keyof typeof ToolTypes

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

const ToolLevelsList = {
    "hand": [1, 1],
    "wood": [2, 1],
    "stone": [4, 2],
    "iron": [8, 3],
    "gold": [16, 2],
    "diamond": [32, 4],
    "netherite": [64, 5],
}
export const ToolLevels = ObjectClassMap<ToolLevel, typeof ToolLevelsList>(ToolLevelsList, ToolLevel)
type ToolLevelNames = keyof typeof ToolLevels

export class Tool implements Item{
    name: string
    multiplier: number
    speed: number
    equipped: boolean
    types: ToolType[]
    level: ToolLevel

    constructor(name: string, level: ToolLevelNames, types?: ToolTypeNames[] | ToolTypeNames, speed?: number, multiplier?: number){
        this.name = name
        this.level = ToolLevels[level]
        this.speed = speed ?? this.level.speed
        this.multiplier = multiplier ?? 1
        this.equipped = false
        this.types = (Array.isArray(types) ? types : (types ? [types] : [])).map(n => ToolTypes[n])
    }

    equip(tools?: Tool[]){
        tools?.forEach(t => t.unequip())
        this.equipped = true
        return this
    }

    unequip(){
        this.equipped = false
        return this
    }

    getSpeedOn(block: Block): number{
        const bestType = this.types.filter(t => t.quickerMineBlocks.find(b => b == block)).sort((a, b) => b.speedMultiplier - a.speedMultiplier)[0]
        if(bestType){
            return this.speed * bestType.speedMultiplier
        }else{
            return this.speed
        }
    }

    getTexture = () => "/tools/" + this.name + ".webp" 
}

export const ToolsList = {
    "hand": ["hand", "hand"],

    "wooden-pickaxe": ["wood", "pickaxe"],
    "wooden-axe": ["wood", "axe"],
    "wooden-shovel": ["wood", "shovel"],
    
    "stone-pickaxe": ["stone", "pickaxe"],
    "stone-axe": ["stone", "axe"],
    "stone-shovel": ["stone", "shovel"],
    
    "iron-pickaxe": ["iron", "pickaxe"],
    "iron-axe": ["iron", "axe"],
    "iron-shovel": ["iron", "shovel"],
    
    "golden-pickaxe": ["gold", "pickaxe"],
    "golden-axe": ["gold", "axe"],
    "golden-shovel": ["gold", "shovel"],
    
    "diamond-pickaxe": ["diamond", "pickaxe"],
    "diamond-axe": ["diamond", "axe"],
    "diamond-shovel": ["diamond", "shovel"],
    
    "netherite-pickaxe": ["netherite", "pickaxe"],
    "netherite-axe": ["netherite", "axe"],
    "netherite-shovel": ["netherite", "shovel"],
}

export type ToolNames = keyof typeof ToolsList
export const Tools = ObjectClassMap<Tool, typeof ToolsList>(ToolsList, Tool)

export interface ToolResolvable{
    name: ToolNames
    equipped: boolean
}