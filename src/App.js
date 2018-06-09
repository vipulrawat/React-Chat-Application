import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor(){
    super();
    this.state={
      currentScreen: 'WhatIsYourUserScreen',
      currentUsername:''
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
      console.log('success')
      this.setState({currentUsername:username,currentScreen:'ChatScreen'})
    })
    .catch(err=>console.error(err));
  }
  render() {
    if(this.state.currentScreen === 'WhatIsYourUserScreen')
      return <UsernameForm onSubmit={this.onUsernameSubmitted}/>
    else if(this.state.currentScreen === 'ChatScreen')
      return <ChatScreen currentUsername={this.state.currentUsername}/>

  }
}

export default App;
