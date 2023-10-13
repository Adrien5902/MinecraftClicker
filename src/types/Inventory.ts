import { BlockName } from "./Block"
import { Tool, Tools } from "./Tool"

export interface Inventory{
    tools: Tool[]
    blocks: Partial<{[key in BlockName]: number}>
}

export const InventoryController = {
    getEquippedTool: (inventory: Inventory) => inventory.tools.find(t => t.equipped) as Tool
}

export const startingInventory :Inventory = {
    tools: [Tools[13].equip()],
    blocks: {dirt: 0}
}