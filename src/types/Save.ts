import { BiomeName } from "./Biome";
import { BlockName } from "./Block";
import { InventoryController, InventoryResolvable, startingInventory } from "./Inventory";
import { Stats, startingStats } from "./Stats";

export interface Save{
    inventory: InventoryResolvable
    currentBlock: BlockName
    currentBiome: BiomeName
    stats: Stats
}

export const startingSave = {
    inventory: InventoryController.parse(startingInventory),
    currentBlock: "dirt",
    currentBiome: "plains",
    stats: startingStats,
}