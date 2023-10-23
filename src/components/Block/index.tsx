import { createContext, useEffect, useRef, useState } from 'react'
import './style.css'
import { Block, BlockName } from '../../types/Block'
import { Inventory, InventoryController } from '../../types/Inventory'
import { Tool, Tools } from '../../types/Tool'
import { Stats } from '../../types/Stats'
import { Biome } from '../../types/Biome'
import BiomeSelect from './Biome/select'
import AutomationsElement from './Automations'

interface Props{
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>
    currentBlock: React.MutableRefObject<Block>
    inventory: Inventory
    setStats: React.Dispatch<React.SetStateAction<Stats>>
    biome: Biome
    setBiome: React.Dispatch<React.SetStateAction<Biome>>
}

export const DestroyContext = createContext<(useTool: boolean, power?: number) => void>(() => {})

export default function BlockElement({
    currentBlock, 
    setInventory, 
    inventory, 
    setStats,
    biome,
    setBiome,
}: Props) {
    const blockRef = useRef<HTMLImageElement>(null)
    const blockDropsRef = useRef<HTMLImageElement>(null)
    const toolRef = useRef<HTMLImageElement>(null)
    const [equippedTool, setEquippedTool] = useState<Tool>(InventoryController.getEquippedTool(inventory))
    const [currentBlockState, setCurrentBlockState] = useState<Block>(currentBlock.current)

    const [destroyStageImage, setDestroyStageImage] = useState("")
    const destroyAmount = useRef(0)

    const biomeRef = useRef<Biome>(biome)

    function destory(useTool: boolean, power: number = 1){
        const Xrange = 12
        const animDuration = 2000

        const mined_blocks: Partial<Record<BlockName, number>> = {}
        const invblock = inventory.blocks

        let mined_amount = destroyAmount.current + (useTool ? (power * equippedTool.speed) : power)
        let bloc = currentBlock.current
        let blocHardnessWithTool = bloc.hardness/(useTool ? equippedTool.getSpeedMultiplierOn(bloc) : 1)

        while(mined_amount >= blocHardnessWithTool){
            mined_amount -= blocHardnessWithTool
            mined_blocks[bloc.name] = mined_blocks[bloc.name] ?? 0
            mined_blocks[bloc.name] = mined_blocks[bloc.name] as number + 1

            invblock[bloc.name] = invblock[bloc.name] ?? 0
            invblock[bloc.name] = invblock[bloc.name] as number + 1
    
            const blockDrop = document.createElement("img")
            blockDropsRef.current?.appendChild(blockDrop)
            blockDrop.classList.add("blockdrop")
            blockDrop.src = bloc.getTexture()

            blockDrop.animate([
                {transform: `translateX(${Math.random() * Xrange - Xrange/2}em) translateY(${Math.random() * 5 + 2}em)`},
                {transform: `
                    translateX(${Math.random() * Xrange*2 - Xrange}em) 
                    translateY(100vh) 
                    rotate(${Math.random() * 720 * (Math.random() >= 0.5 ? -1 : 1)}deg)
                `}
            ], {duration: animDuration, fill: "forwards"})

            setTimeout(() => {
                blockDrop.remove()
            }, animDuration)

            bloc = biomeRef.current.getRandomBlock() ?? bloc
            blocHardnessWithTool = bloc.hardness/(useTool ? equippedTool.getSpeedMultiplierOn(bloc) : 1)
        }

        setInventory(i => ({...i, blocks: invblock}))

        const totalBlocksmined = Object.values(mined_blocks).reduce((prev, curr) => prev + curr, 0)
        
        if(totalBlocksmined > 0){
            setStats(s => ({...s, mined_blocks: s.mined_blocks + totalBlocksmined}))

            destroyAmount.current = mined_amount

            setCurrentBlockState(bloc)
            currentBlock.current = bloc
        }else{
            destroyAmount.current = mined_amount
        }

        const hardnessOutOfTen = Math.floor(destroyAmount.current/currentBlock.current.hardness*10)

        setDestroyStageImage("/destroy/"+(hardnessOutOfTen-1 >= 0 ? hardnessOutOfTen-1 : 0)+".png")
    }

    function handleMouseDown(){
        const animation = equippedTool.types[0]?.animation

        blockRef.current?.animate([
            {
                transform: "scale(.8)"
            }
        ], {duration: 100, fill: "forwards"})

        toolRef.current?.animate(animation[0], animation[2])
    }

    function handleMouseUp(){
        const animation = equippedTool.types[0]?.animation

        blockRef.current?.animate([
            {
                transform: "scale(.8)"
            },
            {
                transform: "scale(1)"
            }
        ], {duration: 100, fill: "forwards"})

        if(animation) toolRef.current?.animate(animation[1], animation[2])
        destory(true)
    }

    useEffect(() => {
        equipTool(InventoryController.getEquippedTool(inventory))
    }, [inventory.tools])

    function equipTool(tool: Tool){
        tool.equip()
        setEquippedTool(tool)
        const animation = tool.types[0]?.animation
        if(animation) toolRef.current?.animate(animation[1], {duration:0, fill: "forwards"})
    }

    function handleDrop(e: React.DragEvent){
        const data = e.dataTransfer.getData("text")
        const [type, value] = data.split(':')

        switch (type.toLowerCase()) {
            case "block":
                if(value != currentBlock.current.name){
                    destroyAmount.current = 0
                    setDestroyStageImage("")
                    currentBlock.current = Block.find(value as BlockName) ?? currentBlock.current
                    setCurrentBlockState(currentBlock.current)
                }
                break;

            case "tool":
                equipTool(Tools[value as keyof typeof Tools])
                break

            default:
                break;
        }
    }

    function updateBiome(biome: Biome){
        destroyAmount.current = 0
        setDestroyStageImage("")
        const newBlock = biome.getRandomBlock() ?? currentBlock.current
        currentBlock.current = newBlock
        setCurrentBlockState(newBlock)
        biomeRef.current = biome
        setBiome(biome)
    }

    return (
        <>
        <div id='block-container' ref={blockDropsRef}>
            <DestroyContext.Provider value={destory}>
            <AutomationsElement 
                /*@ts-ignore*/
                automations={Object.values(inventory.automations)} 
                currentTool={equippedTool}
            />
            </DestroyContext.Provider>
            
            <div id='block' ref={blockRef} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                {
                    (destroyAmount.current/currentBlockState.hardness*10-1 >= 0) ?
                    <>
                    <img className='destroy-stages' src={destroyStageImage}/>
                    <img className='destroy-stages' src={destroyStageImage}/>
                    <img className='destroy-stages' src={destroyStageImage}/>
                    </>
                    : ""
                }
                <img 
                    id='block-main' 
                    draggable={false} 
                    onMouseDown={handleMouseDown} 
                    onMouseUp={handleMouseUp} 
                    src={currentBlockState.getTexture()} 
                    alt={currentBlockState.name}
                />
                <img src={equippedTool.getTexture()} ref={toolRef} id='block-tool'/>
            </div>
            <BiomeSelect currBiome={biome} setBiome={updateBiome}></BiomeSelect>
        </div>
        </>
    )
}