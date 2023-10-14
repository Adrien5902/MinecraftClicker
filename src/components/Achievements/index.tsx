import CloseButton from '../CloseButton'
import './style.css'

interface Props{
    close: () => unknown
}

export default function Achievements({close}: Props) {
    return (<>
        <CloseButton onClick={close}/>
        <div id='stats'>
            <p>Stats :</p>
            <p>Achievements :</p>
        </div>
    </>);
}