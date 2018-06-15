import React from 'react';

class UsernameForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            roomname:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        console.log(this.props.onSubmit(this.state.roomname));
        
    }
    onChange(e){
        this.setState({roomname:e.target.value});
    }
    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" 
                        placeholder="Enter Room Name" 
                        onChange={this.onChange}/>
                    <input type="submit"/>
                </form>
             </div>
        )
    }
}

export default UsernameForm;