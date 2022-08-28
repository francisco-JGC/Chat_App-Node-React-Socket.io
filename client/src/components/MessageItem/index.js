import './index.scss'
import { formatDate } from '../../utils/formatDate'

export default function MessageItem ({body,from, date}){
    return (
        <li className={from === 'me' ? from : 'other'} >
            <h5 className="name">{from === 'me' ? '' : from}</h5>
            <span name="message">{body}</span>
            <small className="time">{formatDate(date)}</small>
        </li>
    )
}