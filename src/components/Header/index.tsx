import { useRef, useState } from 'react';
import './style.css'
import Achievements from '../Achievements';
import Shop from '../Shop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRotate } from '@fortawesome/free-solid-svg-icons';
import { Inventory } from '../../types/Inventory';

interface Props{
    Save: () => Promise<void>
    inventory: Inventory
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>
}

export default function Header({Save, inventory, setInventory}: Props) {
    const Windows = {
        achievements: <Achievements close={close}/>,
        shop: <Shop close={close} inventory={inventory} setInventory={setInventory}/>
    }

    type WindowNames = keyof typeof Windows

    const [opened, setOpen] = useState<null | WindowNames>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [saving, setSaving] = useState<boolean | null>(null)
    
    function handleClick(name: WindowNames){
        setOpen(name)
        dialogRef.current?.showModal()
    }

    function close(){
        setOpen(null)
        dialogRef.current?.close()
    }

    function handleDialogClick(e: React.MouseEvent){
        const dialog = dialogRef.current
        
        if(dialog){
            const dialogDimensions = dialog?.getBoundingClientRect()
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                close()
            }
        }
    }

    async function handleSave(){
        setSaving(true)
        await Save()
        setSaving(false)
        setTimeout(() => {
            setSaving(null)
        }, 1000)
    }

    return (<div id='header'>
        {(Object.keys(Windows) as WindowNames[]).map((n, i) => [
            <img key={i} draggable={false} src={`/${n}.png`} alt={n} onClick={() => handleClick(n)}/>
        ])}

        <span>
            {saving == null ?
            <img src="/save.png" alt="" onClick={handleSave} draggable={false}/>
            : saving ? 
            <FontAwesomeIcon icon={faRotate}/>
            :
            <FontAwesomeIcon icon={faCheck} style={{color: "lime"}}/>
            }
        </span>

        
        <dialog ref={dialogRef} onClick={handleDialogClick}>
            {opened ? Windows[opened] : ""}
        </dialog>
    </div>);
}