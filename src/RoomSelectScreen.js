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
            tokenProvider: new Chatkit.TokenProvider({ url: '/auth' })
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
            .catch(err=>console.log('Error while connecting to the chatkit'))
    }
    roomSelected(e){
        let r = e.target.value;
        this.setState({roomId:r,currentScreen:'ChatScreen'});
    }
    render() {
        if(this.state.currentScreen === 'SelectRoom'){
          return (<div className="mainPage">
                      <h3>Join the Rooms available</h3>
                      <ul>
                          {this.state.roomList.map((room,index)=>{
                              return <div key={index}><button onClick={this.roomSelected.bind(this)} value={room.id} className="roomBtn" ><span>{room.name}</span></button></div>
                          })}
                      </ul>
                  </div>);
        }else if(this.state.currentScreen === 'ChatScreen' && this.state.roomId !== 0){
            return(<ChatScreen roomId={this.state.roomId} currentUsername={this.props.username}/>)
        }

    }
}

export default RoomSelectScreen;
