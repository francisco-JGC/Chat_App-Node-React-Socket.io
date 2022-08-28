import './index.scss'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import MessageItem from '../MessageItem'

export default function Chat(){
    const socket = io('http://localhost:4000')

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [userIsTyping, setUserIsTyping] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(message){
            socket.emit('client:send-message', message);
            const newMessage = {
                from: 'me',
                body: message,
                date: new Date()
            }
            setMessages([...messages,newMessage])
            setMessage('')
        }
    }

    const isTyping = () => {
        socket.emit('client:user-typing', socket.id)
        userIsTyping(true)
    }

    useEffect(() => {
        const receiveMessage = message => {
            setMessages([...messages, message])
        }

        socket.on('server:forward-message', receiveMessage)

        return () => {
            socket.off('server:forward-message', receiveMessage)
        }

    }, [messages, socket])


    socket.on('server:is-typing', user => {

    })

    return (
        <div className="chat">
            <section className="chat-body">
                <ul>
                    {
                        messages ? messages.map((message,index) => (
                            <MessageItem
                                key={index}
                                {...message}
                            />
                        )) : <></>
                    }
                </ul>
            </section>

            <section className="chat-form">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Aa"
                        value={message}
                        onChange={e => {
                            setMessage(e.target.value)
                            isTyping()
                        }}
                    />
                    <button type="submit">
                        <ion-icon name="send-outline" />
                    </button>
                </form>
            </section>
        </div>
    )
}