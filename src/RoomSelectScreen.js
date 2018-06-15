import React from 'react'
import Chatkit from '@pusher/chatkit'
import ChatScreen from './ChatScreen'

class RoomSelectScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomList: [],
            currentScreen:'SelectRoom',
            roomId:0
        }
    }
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:9eff55ed-3202-430b-a600-58489044c886',
            userId: this.props.username,
            tokenProvider: new Chatkit.TokenProvider({ url: 'http://localhost:3001/auth' })
        })
        chatManager.connect()
            .then(currentUser=>{
                currentUser.getJoinableRooms()
                .then(rooms => {
                    // do something with the rooms
                    this.setState({roomList:rooms})
                })
                .catch(err => {
                    console.log(`Error getting joinable rooms: ${err}`)
                })
            })
            .catch(err=>console.log('eerrrrr'))
    }
    roomSelected(e){
        let r = e.target.value;
        this.setState({roomId:r,currentScreen:'ChatScreen'},()=>{
              console.log('Room Id state:',this.state.roomId)
        });
      
    }
    render() {
        if(this.state.currentScreen === 'SelectRoom'){
            return (<div>
                <h3>Select Room to Enter</h3>
                <ul>
                    {this.state.roomList.map((room,index)=>{
                        return <div key={index}><button onDoubleClick={this.roomSelected.bind(this)} value={room.id} >{room.name}</button></div>
                    })}
                </ul>
            </div>);
        }else if(this.state.currentScreen === 'ChatScreen' && this.state.roomId !== 0){
            return(<ChatScreen roomId={this.state.roomId} currentUsername={this.props.username}/>)
        }

    }
}

export default RoomSelectScreen;