import { useContext } from 'react';
import { StatsContext } from '../App';
import CloseButton from '../CloseButton'
import './style.css'
import { formatItemName } from '../../types/functions';

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
                    {`-${formatItemName(n)} : ${stats[n as keyof typeof stats]}`}
                </span>)}
            </div>
            <p>Achievements :</p>
        </div>
    </>);
}