import { useContext } from 'react';
import { StatsContext } from '../App';
import CloseButton from '../CloseButton'
import './style.css'

interface Props{
    close: () => unknown
}

export default function Achievements({close}: Props) {
    const stats = useContext(StatsContext)

    return (<>
        <CloseButton onClick={close}/>
        <div id='stats'>
            <p>Stats :</p>
            <div>
                {Object.keys(stats).map((n, i) => <span key={i}>
                    {`-${n.split("_").map(s => s.slice(0, 1).toUpperCase() + s.slice(1)).join(" ")} : ${stats[n as keyof typeof stats]}`}
                </span>)}
            </div>
            <p>Achievements :</p>
        </div>
    </>);
}