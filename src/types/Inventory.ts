import { BlockName } from "./Block"
import { Tool, Tools } from "./Tool"
import { Upgrade } from "./upgrade"

export interface Inventory{
    tools: Tool[]
    blocks: Partial<{[key in BlockName]: number}>
    upgrades: Upgrade[]
}

export const InventoryController = {
    getEquippedTool: (inventory: Inventory) => inventory.tools.find(t => t.equipped) as Tool
}

export const startingInventory :Inventory = {
    tools: [Tools.hand.equip()],
    blocks: {dirt: 0},
    upgrades: [],
}