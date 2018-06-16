import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'
import './styles/main.css'

class ChatScreen extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: []
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);
    }
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:9eff55ed-3202-430b-a600-58489044c886',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({ url: '/auth' })
        })

        chatManager.connect()
            .then(currentUser => {
                this.setState({ currentUser: currentUser })
                return currentUser.subscribeToRoom({
                    roomId: parseInt(this.props.roomId,10),
                    messageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({ messages: [...this.state.messages, message] })
                        },
                        onUserStartedTyping: user => {
                            this.setState({ usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name] })
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                    username => username !== user.name
                                ),
                            })
                        },
                        onUserCameOnline: () => this.forceUpdate(),
                        onUserWentOffline: () => this.forceUpdate(),
                        onUserJoined: () => this.forceUpdate()
                    }
                })

            })
            .then(currentRoom => { this.setState({ currentRoom: currentRoom }) })
            .catch(error => console.error(error));
    }
    sendMessage(text) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text
        })
    }
    sendTypingEvent() {
        this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id })

            .catch(error => console.error('TYPING ERROR', error))
    }
    render() {
        return (
            <div className="container">
              <div className="leftPane">
                <div id="welcomeText">
                  <h2>Chat Screen</h2>
                  <span>HI,{this.props.currentUsername}</span>
                </div>
                <WhosOnlineList users={this.state.currentRoom.users} currentUser={this.state.currentUser} />
              </div>
              <div className="rightPane">
                <div id="messages"><MessageList messages={this.state.messages} /></div>
                <div id="indicator"><TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} /></div>
                <div id="sendmessage"><SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} /></div>                                
              </div>
              <div className="clearfix"></div>
            </div>
        );
    }
}
    export default ChatScreen;
