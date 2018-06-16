import React from 'react'


class MessageList extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    {this.props.messages.map((message,index)=>(
                        <li key={index}>
                            <div className="messageContainer">
                                <span id="sender">{message.senderId}</span>
                                <p id="messagetext">{message.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default MessageList;
