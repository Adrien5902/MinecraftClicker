import { createContext, useRef, useState } from 'react'
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
import { Settings, defaultSettings } from '../../types/Settings'

const saveItem = window.localStorage.getItem("save")
const save = saveItem ? JSON.parse(saveItem) as Save : startingSave

const settingsSave = window.localStorage.getItem("settings")
const savedSettings = settingsSave ? JSON.parse(settingsSave) : defaultSettings

export const StatsContext = createContext<Stats>(startingStats)
export const SettingsContext = createContext<Settings>(savedSettings)

// window.addEventListener("beforeunload", function (e) {
//     e.returnValue = ""
// });

function App() {
    const [inventory, setInventory] = useState<Inventory>(InventoryController.resolve(save.inventory))
    const currentBlock = useRef<Block>(Block.find(save.currentBlock as BlockName))
    const [stats, setStats] = useState<Stats>(save.stats)
    const [biome, setBiome] = useState<Biome>(Biomes[save.currentBiome as BiomeName])
    const [settings, setSettings] = useState<Settings>(savedSettings)

    function setSetting(setting: keyof Settings, value: any){
        setSettings(s => ({...s, [setting]: value}))
    }

    async function Save(){
        return window.localStorage.setItem("save", JSON.stringify({
            currentBiome: biome.name,
            currentBlock: currentBlock.current.name,
            inventory: InventoryController.parse(inventory),
            stats
        } as Save))
    }

    return (
        <>
            <SettingsContext.Provider value={settings}>
            <StatsContext.Provider value={stats}>
                <Header 
                    Save={Save} 
                    inventory={inventory} 
                    setInventory={setInventory}
                    setSetting={setSetting}
                ></Header>
                <BlockElement 
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
            </SettingsContext.Provider>
        </>
    )
}

export default App
