import { createContext, useState } from 'react'
import './style.css'
import { Block, BlockName } from '../../types/Block'
import { Inventory, InventoryController } from '../../types/Inventory'
import BlockElement from '../Block'
import InventoryElement from '../Inventory'
import Header from '../Header'
import { Stats, startingStats } from '../../types/Stats'
import { Biome, BiomeName, Biomes } from '../../types/Biome'
import { Save, startingSave } from '../../types/Save'
import { RightClickMenu } from '../RightClickMenu'

const saveItem = window.localStorage.getItem("save")
const save = saveItem ? JSON.parse(saveItem) as Save : startingSave

export const StatsContext = createContext<Stats>(startingStats)

window.addEventListener("beforeunload", function (e) {
    e.returnValue = ""
});

function App() {
    const [inventory, setInventory] = useState<Inventory>(InventoryController.resolve(save.inventory))
    const [currentBlock, setCurrentBlock] = useState<Block>(Block.find(save.currentBlock as BlockName))
    const [stats, setStats] = useState<Stats>(save.stats)
    const [biome, setBiome] = useState<Biome>(Biomes[save.currentBiome as BiomeName])

    async function Save(){
        return window.localStorage.setItem("save", JSON.stringify({
            currentBiome: biome.name,
            currentBlock: currentBlock.name,
            inventory: InventoryController.parse(inventory),
            stats
        } as Save))
    }

    return (
        <>
            <StatsContext.Provider value={stats}>
                <Header Save={Save} inventory={inventory} setInventory={setInventory}></Header>
                <BlockElement 
                    setCurrentBlock={setCurrentBlock} 
                    currentBlock={currentBlock} 
                    inventory={inventory} 
                    setInventory={setInventory}
                    setStats={setStats}
                    biome={biome}
                    setBiome={setBiome}
                ></BlockElement>
                <InventoryElement inventory={inventory}/>
            </StatsContext.Provider>
            <RightClickMenu buttons={[]}/>
        </>
    )
}

export default App
