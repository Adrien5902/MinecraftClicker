import { useRef, useState } from 'react';
import './style.css'
import Achievements from '../Achievements';
import Shop from '../Shop';

interface Props{
    
}

export default function Header({}: Props) {
    const Windows = {
        achievements: <Achievements close={close}/>,
        shop: <Shop close={close}/>
    }

    type WindowNames = keyof typeof Windows

    const [opened, setOpen] = useState<null | WindowNames>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    
    function handleClick(name: WindowNames){
        const dialog = dialogRef.current

        if(dialog){
            setOpen(name)
            dialog?.showModal()
        }
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

    return (<div id='header'>
        {(Object.keys(Windows) as WindowNames[]).map((n, i) => [
            <img key={i} draggable={false} src={`/${n}.png`} alt={n} onClick={() => handleClick(n)}/>
        ])}

        <dialog ref={dialogRef} onClick={handleDialogClick}>
            {opened ? Windows[opened] : ""}
        </dialog>
    </div>);
}