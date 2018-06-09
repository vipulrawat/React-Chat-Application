import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'

class ChatScreen extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            messages:[],
            currentRoom:{},
            currentUser:{},
            usersWhoAreTyping:[]
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);

    }
    componentDidMount(){
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:9eff55ed-3202-430b-a600-58489044c886',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({ url: 'http://localhost:3001/auth' })
          })

          chatManager.connect()
            .then(currentUser =>{
                this.setState({currentUser:currentUser})
                return currentUser.subscribeToRoom({
                    roomId: 9068177,
                    messageLimit: 100,
                    hooks:{
                        onNewMessage: message=>{
                            this.setState({messages:[...this.state.messages,message]})
                        },
                        onUserStartedTyping: user=>{
                                                    this.setState({usersWhoAreTyping:[...this.state.usersWhoAreTyping,user.name]})
                                                },
                        onUserStoppedTyping: user=>{
                                this.setState({
                                    usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                        username=>username!==user.name
                                    ),
                                })
                        },
                        onUserCameOnline: ()=>this.forceUpdate(),
                        onUserWentOffline: ()=>this.forceUpdate(),
                        onUserJoined: ()=>this.forceUpdate()
                    }
                })
            })
            .then(currentRoom => {this.setState({currentRoom:currentRoom})})
            .catch(error => console.error(error));
    }
    sendMessage(text){
      this.state.currentUser.sendMessage({
          roomId: this.state.currentRoom.id,
          text
      })
    }
    sendTypingEvent(){
        this.state.currentUser.isTypingIn({roomId:this.state.currentRoom.id})
                               
                                .catch(error=>console.error('TYPING ERROR',error))
    }
    render(){
        return(
            <div>
                <h2>Chat Screen</h2>
                <span>HI,{this.props.currentUsername}</span>
                <WhosOnlineList users={this.state.currentRoom.users}/>
                <hr/>
                <MessageList messages={this.state.messages}/>
                <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping}/>
                <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent}/>
            </div>
        );
    }
}

export default ChatScreen;