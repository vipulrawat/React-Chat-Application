import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm'
import RoomSelectScreen from './RoomSelectScreen'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor(){
    super();
    this.state={
      currentScreen: 'WhatIsYourUserScreen',
      currentUsername:'',
      currentRoom:''
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);

  }
  onUsernameSubmitted(username){
    fetch('http://localhost:3001/users',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({username})
    })
    .then(response=>{
      console.log('User Created Successfully')
      this.setState({currentUsername:username,currentScreen:'RoomSelectScreen'})
    })
    .catch(err=>console.error(err));
  }
  render() {
    if(this.state.currentScreen === 'WhatIsYourUserScreen')
      return <UsernameForm onSubmit={this.onUsernameSubmitted}/>
    else if(this.state.currentScreen === 'RoomSelectScreen')
      return <RoomSelectScreen username={this.state.currentUsername}/>
    else if(this.state.currentScreen === 'ChatScreen')
      return <ChatScreen currentUsername={this.state.currentUsername}/>
  }
}

export default App;
