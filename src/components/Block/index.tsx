import { useRef, useState } from 'react'
import './style.css'
import { Block } from '../../types/Block'
import { Inventory } from '../../types/Inventory'

interface Props{
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>
    currentBlock: Block
}

export default function BlockElement({currentBlock, setInventory}: Props) {
    const blockRef = useRef<HTMLImageElement>(null)
    const blockDropsRef = useRef<HTMLImageElement>(null)

    const [destroyStage, setDestroyStage] = useState(0)

    function handleMouseDown(){
        blockRef.current?.animate([
            {
                transform: "scale(.8)"
            }
        ], {duration: 100, fill: "forwards"})
    }

    function handleMouseUp(){
        blockRef.current?.animate([
            {
                transform: "scale(.8)"
            },
            {
                transform: "scale(1)"
            }
        ], {duration: 100, fill: "forwards"})

        let d = destroyStage
        d++
        if(d >= currentBlock.hardness){
            setDestroyStage(0)
            setInventory(i => ({...i, blocks: {...i.blocks, [currentBlock.name]: ((i.blocks[currentBlock.name] ?? 0) + 1)}}))
            
            const blockDrop = document.createElement("img")
            blockDropsRef.current?.appendChild(blockDrop)
            blockDrop.classList.add("blockdrop")
            blockDrop.src = currentBlock.getTexture()

            const Xrange = 12
            const animDuration = 2000

            blockDrop.animate([
                {transform: `translateX(${Math.random() * Xrange - Xrange/2}em) translateY(8em)`},
                {transform: `translateX(${Math.random() * Xrange*2 - Xrange}em) translateY(100vh) rotate(${Math.random() * 720 * (Math.random() >= 0.5 ? -1 : 1)}deg)`}
            ], {duration: animDuration, fill: "forwards"})

            setTimeout(() => {
                blockDrop.remove()
            }, animDuration)
        }else{
            setDestroyStage(d)
        }
    }

    return (
        <>
        <div id='block-container' ref={blockDropsRef}>
            <div id='block' ref={blockRef}>
                {
                    (destroyStage/currentBlock.hardness*10-1 >= 0) ?
                    <>
                    <img className='destroy-stages' src={"/destroy/"+(Math.floor(destroyStage/currentBlock.hardness*10-1))+".png"}/>
                    <img className='destroy-stages' src={"/destroy/"+(Math.floor(destroyStage/currentBlock.hardness*10-1))+".png"}/>
                    <img className='destroy-stages' src={"/destroy/"+(Math.floor(destroyStage/currentBlock.hardness*10-1))+".png"}/>
                    </>
                    : ""
                }
                <img 
                    id='block-main' 
                    draggable={false} 
                    onMouseDown={handleMouseDown} 
                    onMouseUp={handleMouseUp} 
                    src={currentBlock.getTexture()} 
                    alt={currentBlock.name}
                />
            </div>
        </div>
        </>
    )
}